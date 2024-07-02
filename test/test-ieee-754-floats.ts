// Test writing and reading uint8 values.

import { assert } from 'chai';
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

      it('should decode', () => {
        const buf = new Uint8Array([0x55, 0x52]);
        assert.strictEqual(Token.Float16_BE.get(buf, 0), 85.125);
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

      it('should decode', () => {
        const buf = new Uint8Array([0x52, 0x55]);
        assert.strictEqual(Token.Float16_LE.get(buf, 0), 85.125);
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
        const buf = new Uint8Array([0x42, 0xAA, 0x40, 0x00]);
        assert.strictEqual(Token.Float32_BE.get(buf, 0), 85.125);
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
        const buf = new Uint8Array([0x00, 0x40, 0xAA, 0x42]);
        assert.strictEqual(Token.Float32_LE.get(buf, 0), 85.125);
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
        assert.strictEqual(Token.Float64_BE.get(buf, 0), 85.125);
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
        assert.strictEqual(Token.Float64_LE.get(buf, 0), 85.125);
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
        util.checkBuffer(buf, '4002aa40000000000000');

        Token.Float80_BE.put(buf, 0, -1);
        util.checkBuffer(buf, 'bfff8000000000000000');
      });

      it('should decode', () => {
        const buf = new Uint8Array([0x40, 0x02, 0xAA, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
        assert.strictEqual(Token.Float80_BE.get(buf, 0), 85.125);
      });

    });

    describe('little-endian', () => {

      it('should encode', () => {

        const buf = new Uint8Array(10);

        Token.Float80_LE.put(buf, 0, 0.0);
        util.checkBuffer(buf, '00000000000000000000');

        Token.Float80_LE.put(buf, 0, 85.125);
        util.checkBuffer(buf, '00000000000040aa0240');

        Token.Float80_LE.put(buf, 0, -1);
        util.checkBuffer(buf, '0000000000000080ffbf');
      });

      it.skip('should decode', () => {
        const buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0xAA, 0x02, 0x40]);
        assert.strictEqual(Token.Float80_LE.get(buf, 0), 85.125);
      });

    });
  });

});
