import * as ieee754 from 'ieee754';
import { IToken, IGetToken } from '@tokenizer/token';

// Primitive types

/**
 * 8-bit unsigned integer
 */
export const UINT8: IToken<number> = {

  len: 1,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUInt8(offset);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUInt8(v, offset);
  }
};

/**
 * 16-bit unsigned integer, Little Endian byte order
 */
export const UINT16_LE: IToken<number> = {

  len: 2,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUInt16LE(offset);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUInt16LE(v, offset);
  }
};

/**
 * 16-bit unsigned integer, Big Endian byte order
 */
export const UINT16_BE: IToken<number> = {

  len: 2,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUInt16BE(offset);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUInt16BE(v, offset);
  }
};

/**
 * 24-bit unsigned integer, Little Endian byte order
 */
export const UINT24_LE: IToken<number> = {

  len: 3,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUIntLE(offset, 3);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUIntLE(v, offset, 3);
  }
};

/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export const UINT24_BE: IToken<number> = {
  len: 3,
  get(buffer: Buffer, offset: number): number {
    return buffer.readUIntBE(offset, 3);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUIntBE(v, offset, 3);
  }
};

/**
 * 32-bit unsigned integer, Little Endian byte order
 */
export const UINT32_LE: IToken<number> = {

  len: 4,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUInt32LE(offset);
  },

  put(b: Buffer, o: number, v: number): number {
    return b.writeUInt32LE(v, o);
  }
};

/**
 * 32-bit unsigned integer, Big Endian byte order
 */
export const UINT32_BE: IToken<number> = {

  len: 4,

  get(buffer: Buffer, offset: number): number {
    return buffer.readUInt32BE(offset);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeUInt32BE(v, offset);
  }
};

/**
 * 8-bit signed integer
 */
export const INT8: IToken<number> = {

  len: 1,

  get(buffer: Buffer, offset: number): number {
    return buffer.readInt8(offset);
  },

  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeInt8(v, offset);
  }
};

/**
 * 16-bit signed integer, Big Endian byte order
 */
export const INT16_BE: IToken<number> = {
  len: 2,
  get(buffer: Buffer, offset: number): number {
    return buffer.readInt16BE(offset);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeInt16BE(v, o);
  }
};

/**
 * 16-bit signed integer, Little Endian byte order
 */
export const INT16_LE: IToken<number> = {
  len: 2,
  get(buffer: Buffer, offset: number): number {
    return buffer.readInt16LE(offset);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeInt16LE(v, o);
  }
};

/**
 * 24-bit signed integer, Little Endian byte order
 */
export const INT24_LE: IToken<number> = {
  len: 3,
  get(buffer: Buffer, offset: number): number {
    return buffer.readIntLE(offset, 3);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeIntLE(v, o, 3);
  }
};

/**
 * 24-bit signed integer, Big Endian byte order
 */
export const INT24_BE: IToken<number> = {
  len: 3,
  get(buffer: Buffer, offset: number): number {
    return buffer.readIntBE(offset, 3);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeIntBE(v, o, 3);
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_BE: IToken<number> = {
  len: 4,
  get(buffer: Buffer, offset: number): number {
    return buffer.readInt32BE(offset);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeInt32BE(v, o);
  }
};

/**
 * 32-bit signed integer, Big Endian byte order
 */
export const INT32_LE: IToken<number> = {
  len: 4,
  get(buffer: Buffer, offset: number): number {
    return buffer.readInt32LE(offset);
  },
  put(b: Buffer, o: number, v: number): number {
    return b.writeInt32LE(v, o);
  }
};

/**
 * 64-bit unsigned integer, Little Endian byte order
 */
export const UINT64_LE: IToken<bigint> = {
  len: 8,
  get(buffer: Buffer, offset: number): bigint {
    return buffer.readBigUInt64LE(offset);
  },
  put(buffer: Buffer, offset: number, value: bigint): number {
    return buffer.writeBigUInt64LE(value, offset);
  }
};

/**
 * 64-bit signed integer, Little Endian byte order
 */
export const INT64_LE: IToken<bigint> = {
  len: 8,
  get(buffer: Buffer, offset: number): bigint {
    return buffer.readBigInt64LE(offset);
  },
  put(buffer: Buffer, offset: number, value: bigint): number {
    return buffer.writeBigInt64LE(value, offset);
  }
};

/**
 * 64-bit unsigned integer, Big Endian byte order
 */
export const UINT64_BE: IToken<bigint> = {
  len: 8,
  get(buffer: Buffer, offset: number): bigint {
    return buffer.readBigUInt64BE(offset);
  },
  put(buffer: Buffer, offset: number, value: bigint): number {
    return buffer.writeBigUInt64BE(value, offset);
  }
};

/**
 * 64-bit signed integer, Big Endian byte order
 */
export const INT64_BE: IToken<bigint> = {
  len: 8,
  get(buffer: Buffer, offset: number): bigint {
    return buffer.readBigInt64BE(offset);
  },
  put(buffer: Buffer, offset: number, value: bigint): number {
    return buffer.writeBigInt64BE(value, offset);
  }
};

/**
 * IEEE 754 16-bit (half precision) float, big endian
 */
export const Float16_BE: IToken<number> = {
  len: 2,
  get(b: Buffer, offset: number): number {
    return ieee754.read(b, offset, false, 10, this.len);
  },
  put(b: Buffer, offset: number, v: number): number {
    ieee754.write(b, v, offset, false, 10, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 16-bit (half precision) float, little endian
 */
export const Float16_LE: IToken<number> = {
  len: 2,
  get(buffer: Buffer, offset: number): number {
    return ieee754.read(buffer, offset, true, 10, this.len);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    ieee754.write(buffer, v, offset, true, 10, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 32-bit (single precision) float, big endian
 */
export const Float32_BE: IToken<number> = {
  len: 4,
  get(buffer: Buffer, offset: number): number {
    return buffer.readFloatBE(offset);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeFloatBE(v, offset);
  }
};

/**
 * IEEE 754 32-bit (single precision) float, little endian
 */
export const Float32_LE: IToken<number> = {
  len: 4,
  get(buffer: Buffer, offset: number): number {
    return buffer.readFloatLE(offset);
  },
  put(bufferb: Buffer, offset: number, v: number): number {
    return bufferb.writeFloatLE(v, offset);
  }
};

/**
 * IEEE 754 64-bit (double precision) float, big endian
 */
export const Float64_BE: IToken<number> = {
  len: 8,
  get(buffer: Buffer, offset: number): number {
    return buffer.readDoubleBE(offset);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeDoubleBE(v, offset);
  }
};

/**
 * IEEE 754 64-bit (double precision) float, little endian
 */
export const Float64_LE: IToken<number> = {
  len: 8,
  get(buffer: Buffer, offset: number): number {
    return buffer.readDoubleLE(offset);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    return buffer.writeDoubleLE(v, offset);
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, big endian
 */
export const Float80_BE: IToken<number> = {
  len: 10,
  get(buffer: Buffer, offset: number): number {
    return ieee754.read(buffer, offset, false, 63, this.len);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    ieee754.write(buffer, v, offset, false, 63, this.len);
    return offset + this.len;
  }
};

/**
 * IEEE 754 80-bit (extended precision) float, little endian
 */
export const Float80_LE: IToken<number> = {
  len: 10,
  get(buffer: Buffer, offset: number): number {
    return ieee754.read(buffer, offset, true, 63, this.len);
  },
  put(buffer: Buffer, offset: number, v: number): number {
    ieee754.write(buffer, v, offset, true, 63, this.len);
    return offset + this.len;
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
  public get(buffer: Buffer, offset: number) {
  }
}

export class BufferType implements IGetToken<Buffer> {

  public constructor(public len: number) {
  }

  public get(buffer: Buffer, offset: number): Buffer {
    return buffer.slice(offset, offset + this.len);
  }
}

/**
 * Consume a fixed number of bytes from the stream and return a string with a specified encoding.
 */
export class StringType implements IGetToken<string> {

  public constructor(public len: number, public encoding: BufferEncoding) {
  }

  public get(buffer: Buffer, offset: number): string {
    return buffer.toString(this.encoding, offset, offset + this.len);
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

  private static decode(buffer: Uint8Array, offset: number, until: number): string {
    let str = '';
    for (let i = offset; i < until; ++i) {
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

  public get(buffer: Buffer, offset: number = 0): string {
    return AnsiStringType.decode(buffer, offset, offset + this.len);
  }
}
