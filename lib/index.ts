import { type SupportedEncoding, textDecode, textEncode } from '@borewit/text-codec';
import type { IGetToken, IToken } from '@tokenizer/token';
import * as ieee754 from 'ieee754';

// Primitive types

function dv(array: Uint8Array) {
  return new DataView(array.buffer, array.byteOffset);
}

// Scratch view used to inspect the bits of a JavaScript double.
const f64View = new DataView(new ArrayBuffer(8));

/**
 * Round to the nearest integer, ties to even.
 */
function roundToEven(x: number): number {
  const fl = Math.floor(x);
  const frac = x - fl;
  if (frac > 0.5) {
    return fl + 1;
  }
  if (frac < 0.5) {
    return fl;
  }
  return fl % 2 === 0 ? fl : fl + 1;
}

/**
 * Divide an unsigned integer by 2^shift, rounding to nearest with ties to even.
 */
function shiftRightRoundToEven(value: bigint, shift: number): bigint {
  if (shift > 64) {
    return BigInt(0);
  }
  const shiftBig = BigInt(shift);
  const quotient = value >> shiftBig;
  const remainder = value & ((BigInt(1) << shiftBig) - BigInt(1));
  const halfway = BigInt(1) << (shiftBig - BigInt(1));
  if (remainder > halfway || (remainder === halfway && (quotient & BigInt(1)) === BigInt(1))) {
    return quotient + BigInt(1);
  }
  return quotient;
}

/**
 * Decompose the absolute value of a finite, non-zero double into an integer
 * significand in [2^52, 2^53) and an exponent, so that value = significand * 2^exponent.
 */
function decomposeFloat64(value: number): { significand: number; exponent: number } {
  f64View.setFloat64(0, value);
  const high = f64View.getUint32(0);
  const low = f64View.getUint32(4);
  const expBits = (high >>> 20) & 0x7ff;
  const fraction = (high & 0xfffff) * 2 ** 32 + low;

  if (expBits !== 0) {
    return { significand: 2 ** 52 + fraction, exponent: expBits - 1075 };
  }

  let significand = fraction;
  let exponent = -1074;
  while (significand < 2 ** 52) {
    significand *= 2;
    exponent--;
  }
  return { significand, exponent };
}

/**
 * Read an 80-bit big-endian/little-endian value as a bigint (bit 79 = MSB).
 */
function readBigInt80(array: Uint8Array, offset: number, isLE: boolean): bigint {
  const view = dv(array);
  return isLE
    ? view.getBigUint64(offset, true) | (BigInt(view.getUint16(offset + 8, true)) << BigInt(64))
    : (BigInt(view.getUint16(offset)) << BigInt(64)) | view.getBigUint64(offset + 2);
}

/**
 * Write an 80-bit bigint (bit 79 = MSB) big-endian/little-endian.
 */
function writeBigInt80(array: Uint8Array, offset: number, bits: bigint, isLE: boolean): void {
  const view = dv(array);
  const low = bits & ((BigInt(1) << BigInt(64)) - BigInt(1));
  const high = Number(bits >> BigInt(64));
  if (isLE) {
    view.setBigUint64(offset, low, true);
    view.setUint16(offset + 8, high, true);
  } else {
    view.setUint16(offset, high);
    view.setBigUint64(offset + 2, low);
  }
}

/**
 * Decode an 80-bit IEEE 754 extended-precision float (1-bit sign, 15-bit biased
 * exponent with bias 16383, 1-bit explicit integer bit, 63-bit fraction).
 * Best effort: the result is a JavaScript double, so values beyond 53-bit
 * precision are rounded.
 */
function readFloat80(array: Uint8Array, offset: number, isLE: boolean): number {
  const bits = readBigInt80(array, offset, isLE);
  const negative = ((bits >> BigInt(79)) & BigInt(1)) === BigInt(1);
  const exponent = Number((bits >> BigInt(64)) & BigInt(0x7fff));
  const significand = bits & ((BigInt(1) << BigInt(64)) - BigInt(1));

  // Infinity has the explicit integer bit set; the remaining all-ones exponent
  // encodings (including pseudo-infinity) are NaN.
  if (exponent === 0x7fff) {
    if (significand === BigInt(1) << BigInt(63)) {
      return negative ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    return Number.NaN;
  }

  // Scale the significand into [1, 2) before applying the exponent, otherwise
  // small values underflow in the scale before the significand is applied.
  const unbiasedExponent = exponent === 0 ? -16382 : exponent - 16383;
  let magnitude: number;
  if (unbiasedExponent < -1022) {
    // Round the 64-bit significand directly to binary64 subnormal precision.
    const shift = -unbiasedExponent - 1011;
    magnitude = Number(shiftRightRoundToEven(significand, shift)) * Number.MIN_VALUE;
  } else {
    magnitude = (Number(significand) / 2 ** 63) * 2 ** unbiasedExponent;
  }
  return negative ? -magnitude : magnitude;
}

/**
 * Encode a JavaScript double as an 80-bit IEEE 754 extended-precision float.
 */
function writeFloat80(array: Uint8Array, offset: number, value: number, isLE: boolean): number {
  const negative = value < 0 || Object.is(value, -0);
  const signBit = (negative ? BigInt(1) : BigInt(0)) << BigInt(79);
  let bits: bigint;

  if (Number.isNaN(value)) {
    bits = signBit | (BigInt(0x7fff) << BigInt(64)) | (BigInt(1) << BigInt(63)) | (BigInt(1) << BigInt(62));
  } else if (!Number.isFinite(value)) {
    bits = signBit | (BigInt(0x7fff) << BigInt(64)) | (BigInt(1) << BigInt(63));
  } else if (value === 0) {
    bits = signBit;
  } else {
    const { significand, exponent } = decomposeFloat64(Math.abs(value));
    bits = signBit | (BigInt(exponent + 16435) << BigInt(64)) | (BigInt(significand) << BigInt(11));
  }

  writeBigInt80(array, offset, bits, isLE);
  return offset + 10;
}

/**
 * Encode a JavaScript double as a 16-bit IEEE 754 half-precision float,
 * rounding to nearest-even (ieee754.write only rounds for single precision).
 */
function writeFloat16(array: Uint8Array, offset: number, value: number, isLE: boolean): number {
  const negative = value < 0 || Object.is(value, -0);
  const sign = negative ? 0x8000 : 0;
  const absValue = Math.abs(value);
  let bits: number;

  if (Number.isNaN(value)) {
    bits = sign | 0x7e00;
  } else if (!Number.isFinite(value)) {
    bits = sign | 0x7c00;
  } else if (absValue === 0) {
    bits = sign;
  } else {
    const { significand, exponent } = decomposeFloat64(absValue);
    const exp = exponent + 52;
    if (exp < -14) {
      bits = sign | roundToEven(absValue * 2 ** 24);
    } else {
      let e = exp + 15;
      let m = roundToEven(significand / 2 ** 42);
      if (m === 2048) {
        m = 1024;
        e++;
      }
      bits = e >= 31 ? sign | 0x7c00 : sign | (e << 10) | (m - 1024);
    }
  }

  dv(array).setUint16(offset, bits, isLE);
  return offset + 2;
}

/*
 * 8-bit unsigned integer
 */
export const UINT8: IToken<number> = {
  len: 1,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint8(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint8(offset, value);
    return offset + 1;
  }
};

/**
 * 16-bit unsigned integer, Little Endian byte order
 */
export const UINT16_LE: IToken<number> = {
  len: 2,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint16(offset, true);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint16(offset, value, true);
    return offset + 2;
  }
};

/**
 * 16-bit unsigned integer, Big Endian byte order
 */
export const UINT16_BE: IToken<number> = {
  len: 2,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint16(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint16(offset, value);
    return offset + 2;
  }
};

/**
 * 24-bit unsigned integer, Little Endian byte order
 */
export const UINT24_LE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const dataView = dv(array);
    return dataView.getUint8(offset) + (dataView.getUint16(offset + 1, true) << 8);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint8(offset, value & 0xff);
    dataView.setUint16(offset + 1, value >> 8, true);
    return offset + 3;
  }
};

/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export const UINT24_BE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const dataView = dv(array);
    return (dataView.getUint16(offset) << 8) + dataView.getUint8(offset + 2);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint16(offset, value >> 8);
    dataView.setUint8(offset + 2, value & 0xff);
    return offset + 3;
  }
};

/**
 * 32-bit unsigned integer, Little Endian byte order
 */
export const UINT32_LE: IToken<number> = {
  len: 4,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint32(offset, true);
  },

  put(array: Uint8Array, offset: number, value: number) {
    dv(array).setUint32(offset, value, true);
    return offset + 4;
  }
};

/**
 * 32-bit unsigned integer, Big Endian byte order
 */
export const UINT32_BE: IToken<number> = {
  len: 4,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getUint32(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setUint32(offset, value);
    return offset + 4;
  }
};

/**
 * 8-bit signed integer
 */
export const INT8: IToken<number> = {
  len: 1,

  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt8(offset);
  },

  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt8(offset, value);
    return offset + 1;
  }
};

/**
 * 16-bit signed integer, Big Endian byte order
 */
export const INT16_BE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt16(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt16(offset, value);
    return offset + 2;
  }
};

/**
 * 16-bit signed integer, Little Endian byte order
 */
export const INT16_LE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt16(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt16(offset, value, true);
    return offset + 2;
  }
};

/**
 * 24-bit signed integer, Little Endian byte order
 */
export const INT24_LE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const unsigned = UINT24_LE.get(array, offset);
    return unsigned > 0x7fffff ? unsigned - 0x1000000 : unsigned;
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint8(offset, value & 0xff);
    dataView.setUint16(offset + 1, value >> 8, true);
    return offset + 3;
  }
};

/**
 * 24-bit signed integer, Big Endian byte order
 */
export const INT24_BE: IToken<number> = {
  len: 3,
  get(array: Uint8Array, offset: number): number {
    const unsigned = UINT24_BE.get(array, offset);
    return unsigned > 0x7fffff ? unsigned - 0x1000000 : unsigned;
  },
  put(array: Uint8Array, offset: number, value: number): number {
    const dataView = dv(array);
    dataView.setUint16(offset, value >> 8);
    dataView.setUint8(offset + 2, value & 0xff);
    return offset + 3;
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_BE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt32(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt32(offset, value);
    return offset + 4;
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_LE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getInt32(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setInt32(offset, value, true);
    return offset + 4;
  }
};

/**
 * 64-bit unsigned integer, Little Endian byte order
 */
export const UINT64_LE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigUint64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigUint64(offset, value, true);
    return offset + 8;
  }
};

/**
 * 64-bit signed integer, Little Endian byte order
 */
export const INT64_LE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigInt64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigInt64(offset, value, true);
    return offset + 8;
  }
};

/**
 * 64-bit unsigned integer, Big Endian byte order
 */
export const UINT64_BE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigUint64(offset);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigUint64(offset, value);
    return offset + 8;
  }
};

/**
 * 64-bit signed integer, Big Endian byte order
 */
export const INT64_BE: IToken<bigint> = {
  len: 8,
  get(array: Uint8Array, offset: number): bigint {
    return dv(array).getBigInt64(offset);
  },
  put(array: Uint8Array, offset: number, value: bigint): number {
    dv(array).setBigInt64(offset, value);
    return offset + 8;
  }
};

/**
 * IEEE 754 16-bit (half precision) float, big endian
 */
export const Float16_BE: IToken<number> = {
  len: 2,
  get(dataView: Uint8Array, offset: number): number {
    return ieee754.read(dataView, offset, false, 10, this.len);
  },
  put(dataView: Uint8Array, offset: number, value: number): number {
    return writeFloat16(dataView, offset, value, false);
  }
};

/**
 * IEEE 754 16-bit (half precision) float, little endian
 */
export const Float16_LE: IToken<number> = {
  len: 2,
  get(array: Uint8Array, offset: number): number {
    return ieee754.read(array, offset, true, 10, this.len);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    return writeFloat16(array, offset, value, true);
  }
};

/**
 * IEEE 754 32-bit (single precision) float, big endian
 */
export const Float32_BE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat32(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat32(offset, value);
    return offset + 4;
  }
};

/**
 * IEEE 754 32-bit (single precision) float, little endian
 */
export const Float32_LE: IToken<number> = {
  len: 4,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat32(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat32(offset, value, true);
    return offset + 4;
  }
};

/**
 * IEEE 754 64-bit (double precision) float, big endian
 */
export const Float64_BE: IToken<number> = {
  len: 8,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat64(offset);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat64(offset, value);
    return offset + 8;
  }
};

/**
 * IEEE 754 64-bit (double precision) float, little endian
 */
export const Float64_LE: IToken<number> = {
  len: 8,
  get(array: Uint8Array, offset: number): number {
    return dv(array).getFloat64(offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    dv(array).setFloat64(offset, value, true);
    return offset + 8;
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, big endian
 */
export const Float80_BE: IToken<number> = {
  len: 10,
  get(array: Uint8Array, offset: number): number {
    return readFloat80(array, offset, false);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    return writeFloat80(array, offset, value, false);
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, little endian
 */
export const Float80_LE: IToken<number> = {
  len: 10,
  get(array: Uint8Array, offset: number): number {
    return readFloat80(array, offset, true);
  },
  put(array: Uint8Array, offset: number, value: number): number {
    return writeFloat80(array, offset, value, true);
  }
};

/**
 * Ignore a given number of bytes
 */
export class IgnoreType implements IGetToken<void> {
  /**
   * @param len number of bytes to ignore
   */
  constructor(public len: number) {}

  public get(_array: Uint8Array, _off: number) {
    // ToDo: don't read, but skip data
  }
}

/**
 * Fixed-size byte array
 */
export class Uint8ArrayType implements IToken<Uint8Array> {
  public constructor(public len: number) {}

  public get(array: Uint8Array, offset: number): Uint8Array {
    return array.subarray(offset, offset + this.len);
  }

  public put(array: Uint8Array, offset: number, value: Uint8Array): number {
    if (value.length !== this.len) {
      throw new RangeError(`Expected a value of ${this.len} byte(s), got ${value.length}`);
    }
    array.set(value, offset);
    return offset + this.len;
  }
}

/**
 * Decode or encode a fixed number of bytes as a string with a specified encoding.
 * Supports all encodings supported by TextDecoder, plus 'windows-1252'.
 */
export class StringType implements IToken<string> {
  private encoding?: string;

  constructor(
    public len: number,
    encoding?: string
  ) {
    this.encoding = encoding;
  }

  public get(data: Uint8Array, offset = 0): string {
    const bytes = data.subarray(offset, offset + this.len);
    return textDecode(bytes, this.encoding as SupportedEncoding);
  }

  public put(array: Uint8Array, offset: number, value: string): number {
    const bytes = textEncode(value, this.encoding as SupportedEncoding);
    if (bytes.length !== this.len) {
      throw new RangeError(`Expected an encoded value of ${this.len} byte(s), got ${bytes.length}`);
    }
    array.set(bytes, offset);
    return offset + this.len;
  }
}

/**
 * ANSI Latin 1 String using Windows-1252 (Code Page 1252)
 * Windows-1252 is a superset of ISO 8859-1 / Latin-1.
 */
export class AnsiStringType extends StringType {
  constructor(len: number) {
    super(len, 'windows-1252');
  }
}
