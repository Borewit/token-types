// A fast streaming parser library.

import * as assert from "assert";

// Possibly call flush()
const maybeFlush = (b, o, len, flush) => {
  if (o + len > b.length) {
    if (typeof(flush) !== "function") {
      throw new Error(
        "Buffer out of space and no valid flush() function found"
      );
    }

    flush(b, o);

    return 0;
  }

  return o;
};

export interface IGetToken<T> {

  /**
   * Length in bytes of encoded value
   */
  len: number;

  /**
   * Decode value from buffer at offset
   * @param buf Buffer to read the decoded value from
   * @param off Decode offset
   */
  get(buf: Buffer, off: number): T;
}

export interface IToken<T> extends IGetToken<T> {
  /**
   * Encode value to buffer
   * @param buffer Buffer to write the encoded value to
   * @param offset Buffer write offset
   * @param value Value to decode of type T
   * @param flush ToDo
   */
  put(buffer: Buffer, offset: number, value: T, flush?: IFlush): number
}

export type IFlush = (b: Buffer, o: number) => void;

// Primitive types

/**
 * 8-bit unsigned integer
 */
export const UINT8: IToken<number> = {

  len: 1,

  get(buf: Buffer, off: number): number {
    return buf.readUInt8(off);
  },

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUInt8(v, no);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUInt16LE(v, no);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUInt16BE(v, no);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUIntLE(v, no, 3);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUIntBE(v, no, 3);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffffffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUInt32LE(v, no);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= 0 && v <= 0xffffffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeUInt32BE(v, no);

    return (no - o) + this.len;
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

  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -128 && v <= 127);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeInt8(v, no);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -32768 && v <= 32767);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeInt16BE(v, no);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -32768 && v <= 32767);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeInt16LE(v, no);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -0x800000 && v <= 0x7fffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeIntLE(v, no, 3);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -0x800000 && v <= 0x7fffff);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeIntBE(v, no, 3);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -2147483648 && v <= 2147483647);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeInt32BE(v, no);

    return (no - o) + this.len;
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
  put(b: Buffer, o: number, v: number, flush?: IFlush): number {
    assert.equal(typeof o, "number");
    assert.equal(typeof v, "number");
    assert.ok(v >= -2147483648 && v <= 2147483647);
    assert.ok(o >= 0);
    assert.ok(this.len <= b.length);

    const no = maybeFlush(b, o, this.len, flush);
    b.writeInt32LE(v, no);

    return (no - o) + this.len;
  }
};

/**
 * Ignore a given number of bytes
 */
export class IgnoreType implements IGetToken<Buffer> {

  /**
   * @param len number of bytes to ignore
   */
  constructor(public len: number) {
  }

  // ToDo: don't read, but skip data
  public get(buf: Buffer, off: number): Buffer {
    return null;
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

  public constructor(public len: number, public encoding: string) {
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
    let str = "";
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
      throw Error("invaliding encoding");
    }

    return codePoint;
  }

  public constructor(public len: number) {
  }

  public get(buf: Buffer, off: number = 0): string {
    return AnsiStringType.decode(buf, off, off + this.len);
  }
}
