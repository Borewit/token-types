// Test reading int16 values.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 16-bit signed integer', () => {

  describe('big-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(2);

      Token.INT16_BE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '0000');

      Token.INT16_BE.put(buf, 0, 0x0f0b);
      util.checkBuffer(buf, '0f0b');

      Token.INT16_BE.put(buf, 0, -0x0f0b);
      util.checkBuffer(buf, 'f0f5');
    });

    it('should decode', () => {

      const buf = new Uint8Array([0x0a, 0x1a, 0x00, 0x00, 0xff, 0xff, 0x80, 0x00]);

      assert.equal(Token.INT16_BE.get(buf, 0), 2586);
      assert.equal(Token.INT16_BE.get(buf, 2), 0);
      assert.equal(Token.INT16_BE.get(buf, 4), -1);
      assert.equal(Token.INT16_BE.get(buf, 6), -32768);

    });
  });

  describe('little-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(2);

      Token.INT16_LE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '0000');

      Token.INT16_LE.put(buf, 0, 0x0f0b);
      util.checkBuffer(buf, '0b0f');

      Token.INT16_LE.put(buf, 0, -0x0f0b);
      util.checkBuffer(buf, 'f5f0');
    });

    it('should decode', () => {

      const buf = new Uint8Array([0x1a, 0x0a, 0x00, 0x00, 0xff, 0xff, 0x00, 0x80]);

      assert.equal(Token.INT16_LE.get(buf, 0), 2586);
      assert.equal(Token.INT16_LE.get(buf, 2), 0);
      assert.equal(Token.INT16_LE.get(buf, 4), -1);
      assert.equal(Token.INT16_LE.get(buf, 6), -32768);

    });
  });

});
