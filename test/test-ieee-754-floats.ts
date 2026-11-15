// Test writing and reading uint8 values.

import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('IEEE 754 floats', () => {
  describe('16-bit (half precision)', () => {
    describe('big-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(2);

        Token.Float16_BE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '0000');

        Token.Float16_BE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '5552');

        Token.Float16_BE.put(buf, 0, -1);
        util.checkBuffer(buf, 'bc00');
      });

      it('should round to nearest-even and encode special values', () => {
        const buf = new Uint8Array(2);

        Token.Float16_BE.put(buf, 0, Number.POSITIVE_INFINITY);
        util.checkBuffer(buf, '7c00');

        Token.Float16_BE.put(buf, 0, Number.NEGATIVE_INFINITY);
        util.checkBuffer(buf, 'fc00');

        Token.Float16_BE.put(buf, 0, Number.NaN);
        util.checkBuffer(buf, '7e00');

        Token.Float16_BE.put(buf, 0, -0);
        util.checkBuffer(buf, '8000');

        Token.Float16_BE.put(buf, 0, 65519);
        util.checkBuffer(buf, '7bff');

        Token.Float16_BE.put(buf, 0, 65520);
        util.checkBuffer(buf, '7c00');

        Token.Float16_BE.put(buf, 0, 2 ** -25);
        util.checkBuffer(buf, '0000');

        Token.Float16_BE.put(buf, 0, 1022.5 * 2 ** -24);
        util.checkBuffer(buf, '03fe');

        Token.Float16_BE.put(buf, 0, 1023.5 * 2 ** -24);
        util.checkBuffer(buf, '0400');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x55, 0x52]);
        expect(Token.Float16_BE.get(buf, 0)).toBe(85.125);
      });

      it('should round 1.9999 to 2 (issue #862)', () => {
        const buf = new Uint8Array(2);
        Token.Float16_BE.put(buf, 0, 1.9999);
        expect(Token.Float16_BE.get(buf, 0)).toBe(2);
      });
    });

    describe('little-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(2);

        Token.Float16_LE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '0000');

        Token.Float16_LE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '5255');

        Token.Float16_LE.put(buf, 0, -1);
        util.checkBuffer(buf, '00bc');
      });

      it('should round subnormal values to nearest-even', () => {
        const buf = new Uint8Array(2);

        Token.Float16_LE.put(buf, 0, 2 ** -25);
        util.checkBuffer(buf, '0000');

        Token.Float16_LE.put(buf, 0, 1022.5 * 2 ** -24);
        util.checkBuffer(buf, 'fe03');

        Token.Float16_LE.put(buf, 0, 1023.5 * 2 ** -24);
        util.checkBuffer(buf, '0004');

        Token.Float16_LE.put(buf, 0, Number.NEGATIVE_INFINITY);
        util.checkBuffer(buf, '00fc');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x52, 0x55]);
        expect(Token.Float16_LE.get(buf, 0)).toBe(85.125);
      });

      it('should round 1.9999 to 2 (issue #862)', () => {
        const buf = new Uint8Array(2);
        Token.Float16_LE.put(buf, 0, 1.9999);
        expect(Token.Float16_LE.get(buf, 0)).toBe(2);
      });
    });
  });

  describe('32-bit (single precision)', () => {
    describe('big-endian', () => {
      it('should encode', () => {
        const buffer = new Uint8Array(4);

        Token.Float32_BE.put(buffer, 0, 0.0);
        util.checkBuffer(buffer, '00000000');

        Token.Float32_BE.put(buffer, 0, 85.125);
        util.checkBuffer(buffer, '42aa4000');

        Token.Float32_BE.put(buffer, 0, -1);
        util.checkBuffer(buffer, 'bf800000');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x42, 0xaa, 0x40, 0x00]);
        expect(Token.Float32_BE.get(buf, 0)).toBe(85.125);
      });
    });

    describe('little-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(4);

        Token.Float32_LE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '00000000');

        Token.Float32_LE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '0040aa42');

        Token.Float32_LE.put(buf, 0, -1);
        util.checkBuffer(buf, '000080bf');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x00, 0x40, 0xaa, 0x42]);
        expect(Token.Float32_LE.get(buf, 0)).toBe(85.125);
      });
    });
  });

  describe('64-bit (double precision)', () => {
    describe('big-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(8);

        Token.Float64_BE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '0000000000000000');

        Token.Float64_BE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '4055480000000000');

        Token.Float64_BE.put(buf, 0, -1);
        util.checkBuffer(buf, 'bff0000000000000');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x40, 0x55, 0x48, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect(Token.Float64_BE.get(buf, 0)).toBe(85.125);
      });
    });

    describe('little-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(8);

        Token.Float64_LE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '0000000000000000');

        Token.Float64_LE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '0000000000485540');

        Token.Float64_LE.put(buf, 0, -1);
        util.checkBuffer(buf, '000000000000f0bf');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x48, 0x55, 0x40]);
        expect(Token.Float64_LE.get(buf, 0)).toBe(85.125);
      });
    });
  });

  describe('80-bit (extended precision)', () => {
    describe('big-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(10);

        Token.Float80_BE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '00000000000000000000');

        Token.Float80_BE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '4005aa40000000000000');

        Token.Float80_BE.put(buf, 0, -1);
        util.checkBuffer(buf, 'bfff8000000000000000');

        Token.Float80_BE.put(buf, 0, 44100);
        util.checkBuffer(buf, '400eac44000000000000');
      });

      it('should encode special and subnormal values', () => {
        const buf = new Uint8Array(10);

        Token.Float80_BE.put(buf, 0, -0);
        util.checkBuffer(buf, '80000000000000000000');

        Token.Float80_BE.put(buf, 0, Number.POSITIVE_INFINITY);
        util.checkBuffer(buf, '7fff8000000000000000');

        Token.Float80_BE.put(buf, 0, Number.NEGATIVE_INFINITY);
        util.checkBuffer(buf, 'ffff8000000000000000');

        Token.Float80_BE.put(buf, 0, Number.NaN);
        util.checkBuffer(buf, '7fffc000000000000000');

        Token.Float80_BE.put(buf, 0, Number.MIN_VALUE);
        util.checkBuffer(buf, '3bcd8000000000000000');
        expect(Token.Float80_BE.get(buf, 0)).toBe(Number.MIN_VALUE);
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x40, 0x05, 0xaa, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        expect(Token.Float80_BE.get(buf, 0)).toBe(85.125);
      });

      it('should decode special and subnormal values', () => {
        const fromHex = (hex: string) => Uint8Array.from(Buffer.from(hex, 'hex'));

        expect(Token.Float80_BE.get(fromHex('7fff8000000000000000'), 0)).toBe(Number.POSITIVE_INFINITY);
        expect(Token.Float80_BE.get(fromHex('ffff8000000000000000'), 0)).toBe(Number.NEGATIVE_INFINITY);
        expect(Token.Float80_BE.get(fromHex('7fffc000000000000000'), 0)).toBeNaN();
        expect(Token.Float80_BE.get(fromHex('7fff0000000000000000'), 0)).toBeNaN();
        expect(Token.Float80_BE.get(fromHex('3bcd8000000000000000'), 0)).toBe(Number.MIN_VALUE);
        expect(Token.Float80_BE.get(fromHex('3bcc8000000000000001'), 0)).toBe(Number.MIN_VALUE);
        expect(Token.Float80_BE.get(fromHex('3bcc8000000000000000'), 0)).toBe(0);
        expect(Token.Float80_BE.get(fromHex('c005aa40000000000000'), 0)).toBe(-85.125);
        expect(Token.Float80_BE.get(fromHex('00000000000000000001'), 0)).toBe(0);
        expect(Object.is(Token.Float80_BE.get(fromHex('80000000000000000000'), 0), -0)).toBe(true);
      });

      it('should decode issue #862 values', () => {
        expect(
          Token.Float80_BE.get(Uint8Array.from([0x40, 0x0e, 0xac, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 0)
        ).toBe(44100);
        expect(
          Token.Float80_BE.get(Uint8Array.from([0x40, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 0)
        ).toBe(2);
        expect(
          Token.Float80_BE.get(Uint8Array.from([0x3f, 0xfe, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 0)
        ).toBe(0.5);
      });
    });

    describe('little-endian', () => {
      it('should encode', () => {
        const buf = new Uint8Array(10);

        Token.Float80_LE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '00000000000000000000');

        Token.Float80_LE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '00000000000040aa0540');

        Token.Float80_LE.put(buf, 0, -1);
        util.checkBuffer(buf, '0000000000000080ffbf');

        Token.Float80_LE.put(buf, 0, Number.MIN_VALUE);
        util.checkBuffer(buf, '0000000000000080cd3b');
        expect(Token.Float80_LE.get(buf, 0)).toBe(Number.MIN_VALUE);
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0xaa, 0x05, 0x40]);
        expect(Token.Float80_LE.get(buf, 0)).toBe(85.125);
      });

      it('should decode subnormal boundary values', () => {
        const fromHex = (hex: string) => Uint8Array.from(Buffer.from(hex, 'hex'));

        expect(Token.Float80_LE.get(fromHex('0100000000000080cc3b'), 0)).toBe(Number.MIN_VALUE);
        expect(Token.Float80_LE.get(fromHex('0000000000000080cc3b'), 0)).toBe(0);
      });

      it('should decode issue #862 values', () => {
        expect(
          Token.Float80_LE.get(Uint8Array.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x44, 0xac, 0x0e, 0x40]), 0)
        ).toBe(44100);
      });
    });
  });
});
