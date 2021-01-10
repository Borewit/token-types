import * as assert from 'assert';
import * as ieee754 from 'ieee754';
import { IToken, IGetToken } from '@tokenizer/token';

// Primitive types

/**
 * 8-bit unsigned integer
 */
export const UINT8: IToken<number> = {

  len: 1,

  get(buf: Buffer, off: number): number {
    return buf.readUInt8(off);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUInt8(v, off);
  }
};

/**
 * 16-bit unsigned integer, Little Endian byte order
 */
export const UINT16_LE: IToken<number> = {

  len: 2,

  get(buf: Buffer, off: number): number {
    return buf.readUInt16LE(off);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUInt16LE(v, off);
  }
};

/**
 * 16-bit unsigned integer, Big Endian byte order
 */
export const UINT16_BE: IToken<number> = {

  len: 2,

  get(buf: Buffer, off: number): number {
    return buf.readUInt16BE(off);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUInt16BE(v, off);
  }
};

/**
 * 24-bit unsigned integer, Little Endian byte order
 */
export const UINT24_LE: IToken<number> = {

  len: 3,

  get(buf: Buffer, off: number): number {
    return buf.readUIntLE(off, 3);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffffff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUIntLE(v, off, 3);
  }
};

/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export const UINT24_BE: IToken<number> = {
  len: 3,
  get(buf: Buffer, off: number): number {
    return buf.readUIntBE(off, 3);
  },
  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffffff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUIntBE(v, off, 3);
  }
};

/**
 * 32-bit unsigned integer, Little Endian byte order
 */
export const UINT32_LE: IToken<number> = {

  len: 4,

  get(buf: Buffer, off: number): number {
    return buf.readUInt32LE(off);
  },

  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffffffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeUInt32LE(v, o);
  }
};

/**
 * 32-bit unsigned integer, Big Endian byte order
 */
export const UINT32_BE: IToken<number> = {

  len: 4,

  get(buf: Buffer, off: number): number {
    return buf.readUInt32BE(off);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0 && v <= 0xffffffff);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeUInt32BE(v, off);
  }
};

/**
 * 8-bit signed integer
 */
export const INT8: IToken<number> = {

  len: 1,

  get(buf: Buffer, off: number): number {
    return buf.readInt8(off);
  },

  put(buf: Buffer, off: number, v: number): number {
    assert.equal(typeof off, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -128 && v <= 127);
    assert.ok(off >= 0);
    assert.ok(this.len <= buf.length);

    return buf.writeInt8(v, off);
  }
};

/**
 * 16-bit signed integer, Big Endian byte order
 */
export const INT16_BE: IToken<number> = {
  len: 2,
  get(buf: Buffer, off: number): number {
    return buf.readInt16BE(off);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -32768 && v <= 32767);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeInt16BE(v, o);
  }
};

/**
 * 16-bit signed integer, Little Endian byte order
 */
export const INT16_LE: IToken<number> = {
  len: 2,
  get(buf: Buffer, off: number): number {
    return buf.readInt16LE(off);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -32768 && v <= 32767);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeInt16LE(v, o);
  }
};

/**
 * 24-bit signed integer, Little Endian byte order
 */
export const INT24_LE: IToken<number> = {
  len: 3,
  get(buf: Buffer, off: number): number {
    return buf.readIntLE(off, 3);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -0x800000 && v <= 0x7fffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeIntLE(v, o, 3);
  }
};

/**
 * 24-bit signed integer, Big Endian byte order
 */
export const INT24_BE: IToken<number> = {
  len: 3,
  get(buf: Buffer, off: number): number {
    return buf.readIntBE(off, 3);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -0x800000 && v <= 0x7fffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeIntBE(v, o, 3);
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_BE: IToken<number> = {
  len: 4,
  get(buf: Buffer, off: number): number {
    return buf.readInt32BE(off);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -2147483648 && v <= 2147483647);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeInt32BE(v, o);
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_LE: IToken<number> = {
  len: 4,
  get(buf: Buffer, off: number): number {
    return buf.readInt32LE(off);
  },
  put(b: Buffer, o: number, v: number): number {
    assert.equal(typeof o, 'number');
    assert.equal(typeof v, 'number');
    assert.ok(v >= -2147483648 && v <= 2147483647);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    return b.writeInt32LE(v, o);
  }
};

/**
 * 64-bit unsigned integer, Little Endian byte order
 */
export const UINT64_LE: IToken<number> = {
  len: 8,
  get(buf: Buffer, off: number): number {
    return readUIntLE(buf, off, this.len);
  },
  put(b: Buffer, o: number, v: number): number {
    return writeUIntLE(b, v, o, this.len);
  }
};

/**
 * 64-bit signed integer, Little Endian byte order
 */
export const INT64_LE: IToken<number> = {
  len: 8,
  get(buf: Buffer, off: number): number {
    return readIntLE(buf, off, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return writeIntLE(b, v, off, this.len);
  }
};

/**
 * 64-bit unsigned integer, Big Endian byte order
 */
export const UINT64_BE: IToken<number> = {
  len: 8,
  get(b: Buffer, off: number): number {
    return readUIntBE(b, off, this.len);
  },
  put(b: Buffer, o: number, v: number): number {
    return writeUIntBE(b, v, o, this.len);
  }
};

/**
 * 64-bit signed integer, Big Endian byte order
 */
export const INT64_BE: IToken<number> = {
  len: 8,
  get(b: Buffer, off: number): number {
    return readIntBE(b, off, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return writeIntBE(b, v, off, this.len);
  }
};

/**
 * IEEE 754 16-bit (half precision) float, big endian
 */
export const Float16_BE: IToken<number> = {
  len: 2,
  get(b: Buffer, off: number): number {
    return ieee754.read(b, off, false, 10, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return ieee754.write(b, v, off, false, 10, this.len);
  }
};

/**
 * IEEE 754 16-bit (half precision) float, little endian
 */
export const Float16_LE: IToken<number> = {
  len: 2,
  get(b: Buffer, off: number): number {
    return ieee754.read(b, off, true, 10, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return ieee754.write(b, v, off, true, 10, this.len);
  }
};

/**
 * IEEE 754 32-bit (single precision) float, big endian
 */
export const Float32_BE: IToken<number> = {
  len: 4,
  get(b: Buffer, off: number): number {
    return b.readFloatBE(off);
  },
  put(b: Buffer, off: number, v: number): number {
    return b.writeFloatBE(v, off);
  }
};

/**
 * IEEE 754 32-bit (single precision) float, little endian
 */
export const Float32_LE: IToken<number> = {
  len: 4,
  get(b: Buffer, off: number): number {
    return b.readFloatLE(off);
  },
  put(b: Buffer, off: number, v: number): number {
    return b.writeFloatLE(v, off);
  }
};

/**
 * IEEE 754 64-bit (double precision) float, big endian
 */
export const Float64_BE: IToken<number> = {
  len: 8,
  get(b: Buffer, off: number): number {
    return b.readDoubleBE(off);
  },
  put(b: Buffer, off: number, v: number): number {
    return b.writeDoubleBE(v, off);
  }
};

/**
 * IEEE 754 64-bit (double precision) float, little endian
 */
export const Float64_LE: IToken<number> = {
  len: 8,
  get(b: Buffer, off: number): number {
    return b.readDoubleLE(off);
  },
  put(b: Buffer, off: number, v: number): number {
    return b.writeDoubleLE(v, off);
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, big endian
 */
export const Float80_BE: IToken<number> = {
  len: 10,
  get(b: Buffer, off: number): number {
    return ieee754.read(b, off, false, 63, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return ieee754.write(b, v, off, false, 63, this.len);
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, little endian
 */
export const Float80_LE: IToken<number> = {
  len: 10,
  get(b: Buffer, off: number): number {
    return ieee754.read(b, off, true, 63, this.len);
  },
  put(b: Buffer, off: number, v: number): number {
    return ieee754.write(b, v, off, true, 63, this.len);
  }
};

/**
 * Ignore a given number of bytes
 */
export class IgnoreType implements IGetToken<void> {

  /**
   * @param len number of bytes to ignore
   */
  constructor(public len: number) {
  }

  // ToDo: don't read, but skip data
  public get(buf: Buffer, off: number) {
  }
}

export class BufferType implements IGetToken<Buffer> {

  public constructor(public len: number) {
  }

  public get(buf: Buffer, off: number): Buffer {
    return buf.slice(off, off + this.len);
  }
}

/**
 * Consume a fixed number of bytes from the stream and return a string with a specified encoding.
 */
export class StringType implements IGetToken<string> {

  public constructor(public len: number, public encoding: BufferEncoding) {
  }

  public get(buf: Buffer, off: number): string {
    return buf.toString(this.encoding, off, off + this.len);
  }
}

/**
 * ANSI Latin 1 String
 * Using windows-1252 / ISO 8859-1 decoding
 */
export class AnsiStringType implements IGetToken<string> {

  private static windows1252 = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352,
    8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732,
    8482, 353, 8250, 339, 157, 382, 376, 160, 161, 162, 163, 164, 165, 166, 167, 168,
    169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184,
    185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
    201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216,
    217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232,
    233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247,
    248, 249, 250, 251, 252, 253, 254, 255];

  private static decode(buffer: Uint8Array, off: number, until: number): string {
    let str = '';
    for (let i = off; i < until; ++i) {
      str += AnsiStringType.codePointToString(AnsiStringType.singleByteDecoder(buffer[i]));
    }
    return str;
  }

  private static inRange(a, min, max): boolean {
    return min <= a && a <= max;
  }

  private static codePointToString(cp: number): string {
    if (cp <= 0xFFFF) {
      return String.fromCharCode(cp);
    } else {
      cp -= 0x10000;
      return String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00);
    }
  }

  private static singleByteDecoder(bite: number): number {
    if (AnsiStringType.inRange(bite, 0x00, 0x7F)) {
      return bite;
    }

    const codePoint = AnsiStringType.windows1252[bite - 0x80];
    if (codePoint === null) {
      throw Error('invaliding encoding');
    }

    return codePoint;
  }

  public constructor(public len: number) {
  }

  public get(buf: Buffer, off: number = 0): string {
    return AnsiStringType.decode(buf, off, off + this.len);
  }
}

/**
 * Best effort approach to read up to 64 bit unsigned integer, little endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
function readUIntLE(buf: Buffer, offset: number, byteLength: number): number {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let val = buf[offset];
  let mul = 1;
  let i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += buf[offset + i] * mul;
  }
  return val;
}

/**
 * Best effort approach to write up to 64 bit unsigned integer, little endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
function writeUIntLE(buf: Buffer, value: number, offset: number, byteLength: number) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let mul = 1;
  let i = 0;
  buf[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    buf[offset + i] = (value / mul) & 0xFF;
  }
  return offset + byteLength;
}

/**
 * Best effort approach to read 64 but signed integer, little endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
function readIntLE(buf: Buffer, offset: number, byteLength: number): number {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let val = buf[offset];
  let mul = 1;
  let i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += buf[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
}

/**
 * Best effort approach to write 64 but signed integer, little endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export function writeIntLE(buf: Buffer, value: number, offset: number, byteLength: number): number {
  value = +value;
  offset = offset >>> 0;

  let i = 0;
  let mul = 1;
  let sub = 0;
  buf[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && buf[offset + i - 1] !== 0) {
      sub = 1;
    }
    buf[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
}

/**
 * Best effort approach to read up to 64 bit unsigned integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export function readUIntBE(buf: Buffer, offset: number, byteLength: number): number {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let val = buf[offset + --byteLength];
  let mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += buf[offset + --byteLength] * mul;
  }
  return val;
}

/**
 * Best effort approach to write up to 64 bit unsigned integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export function writeUIntBE(buf: Buffer, value: number, offset: number, byteLength: number) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let i = byteLength - 1;
  let mul = 1;
  buf[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    buf[offset + i] = (value / mul) & 0xFF;
  }
  return offset + byteLength;
}

/**
 * Best effort approach to read 64 but signed integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export function readIntBE(buf: Buffer, offset: number, byteLength: number): number {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;

  let i = byteLength;
  let mul = 1;
  let val = buf[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += buf[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
}

/**
 * Best effort approach to write 64 but signed integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export function writeIntBE(buf: Buffer, value: number, offset: number, byteLength: number): number {
  value = +value;
  offset = offset >>> 0;

  let i = byteLength - 1;
  let mul = 1;
  let sub = 0;
  buf[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && buf[offset + i + 1] !== 0) {
      sub = 1;
    }
    buf[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
}
