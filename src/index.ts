// A fast streaming parser library.

import * as assert from 'assert';

// Possibly call flush()
const maybeFlush = (b, o, len, flush) => {
    if (o + len > b.length) {
        if (typeof(flush) !== 'function') {
            throw new Error(
                'Buffer out of space and no valid flush() function found'
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        return buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16);
    },

    put(b: Buffer, o: number, v: number, flush?: IFlush): number {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        const no = maybeFlush(b, o, this.len, flush);
        b[no] = v & 0xff;
        b[no + 1] = (v >>> 8) & 0xff;
        b[no + 2] = (v >>> 16) & 0xff;

        return (no - o) + this.len;
    }
};

/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export const UINT24_BE: IToken<number> = {
    len : 3,
    get(buf: Buffer, off: number): number {
        return (((buf[off] << 8) + buf[off + 1]) << 8) + buf[off + 2]
    },
    put(b: Buffer, o: number, v: number, flush?: IFlush): number {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        const no = maybeFlush(b, o, this.len, flush);
        b[no] = (v >>> 16) & 0xff;
        b[no + 1] = (v >>> 8) & 0xff;
        b[no + 2] = v & 0xff;

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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= -32768 && v <= 32767);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        const no = maybeFlush(b, o, this.len, flush);
        b.writeInt16LE(v, no);

        return (no - o) + this.len;
    }
};

/**
 * 24-bit signed integer, Big Endian byte order
 */
export const INT24_BE: IToken<number> = {
    len: 3,
    get(buf: Buffer, off: number): number {
        const v = UINT24_BE.get(buf, off);
        return ((v & 0x800000) === 0x800000) ?
            (-0x800000 + (v & 0x7fffff)) : v;
    },
    put(b: Buffer, o: number, v: number, flush?: IFlush): number {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= -0x800000 && v <= 0x7fffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        const no = maybeFlush(b, o, this.len, flush);
        b[no] = (v >>> 16) & 0xff;
        b[no + 1] = (v >>> 8) & 0xff;
        b[no + 2] = v & 0xff;

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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
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

