// Test reading int32 values.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 32-bit signed integer', () => {

  describe('big-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(4);

      Token.INT32_BE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '00000000');

      Token.INT32_BE.put(buf, 0, 0x0f0bcca0);
      util.checkBuffer(buf, '0f0bcca0');

      Token.INT32_BE.put(buf, 0, -1);
      util.checkBuffer(buf, 'ffffffff');

      Token.INT32_BE.put(buf, 0, -0x0f0bcca0);
      util.checkBuffer(buf, 'f0f43360');
    });

    it('should decode', () => {

      let buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
      assert.equal(Token.INT32_BE.get(buf, 0), 0);
      assert.equal(Token.INT32_BE.get(buf, 4), -1);

      buf = new Uint8Array([0x00, 0x10, 0x00, 0xff, 0x80, 0x00, 0x00, 0x00]);
      assert.equal(Token.INT32_BE.get(buf, 0), 1048831);
      assert.equal(Token.INT32_BE.get(buf, 4), -2147483648);

    });

  });

  describe('little-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(4);

      Token.INT32_LE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '00000000');

      Token.INT32_LE.put(buf, 0, 0x0f0bcca0);
      util.checkBuffer(buf, 'a0cc0b0f');

      Token.INT32_LE.put(buf, 0, -1);
      util.checkBuffer(buf, 'ffffffff');

      Token.INT32_LE.put(buf, 0, -0x0f0bcca0);
      util.checkBuffer(buf, '6033f4f0');
    });

    it('should decode', () => {

      let buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

      assert.equal(Token.INT32_LE.get(buf, 0), 0);
      assert.equal(Token.INT32_LE.get(buf, 4), -1);

      buf = new Uint8Array([0xff, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0x80]);
      assert.equal(Token.INT32_LE.get(buf, 0), 1048831);
      assert.equal(Token.INT32_LE.get(buf, 4), -2147483648);

    });

  });
});
