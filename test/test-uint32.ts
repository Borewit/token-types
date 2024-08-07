// Test writing and reading uint32 values in different endiannesses.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 32-bit unsigned integer', () => {

  const decbuf = new Uint8Array([0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00]);

  describe('big-endian', () => {

    it('should encode', () => {
      const buf = new Uint8Array(4);

      Token.UINT32_BE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '00000000');

      Token.UINT32_BE.put(buf, 0, 0xff);
      util.checkBuffer(buf, '000000ff');

      Token.UINT32_BE.put(buf, 0, 0xaabbccdd);
      util.checkBuffer(buf, 'aabbccdd');
    });

    it('should decode', () => {
      assert.equal(Token.UINT32_BE.get(decbuf, 4), 0x1a001a00);
      assert.equal(Token.UINT32_BE.get(decbuf, 12), 0x1a001a00);
    });
  });

  describe('little-endian', () => {

    it('should encode', () => {
      const buf = new Uint8Array(4);

      Token.UINT32_LE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '00000000');

      Token.UINT32_LE.put(buf, 0, 0xff);
      util.checkBuffer(buf, 'ff000000');

      Token.UINT32_LE.put(buf, 0, 0xaabbccdd);
      util.checkBuffer(buf, 'ddccbbaa');
    });

    it('should decode', () => {
      assert.equal(Token.UINT32_LE.get(decbuf, 0), 0x001a001a);
      assert.equal(Token.UINT32_LE.get(decbuf, 8), 0x001a001a);
    });
  });

  describe('should decode', () => {

    it('big-endian', () => {
      assert.equal(Token.UINT32_BE.get(decbuf, 4), 0x1a001a00);
      assert.equal(Token.UINT32_BE.get(decbuf, 12), 0x1a001a00);
    });

    it('little-endian', () => {
      assert.equal(Token.UINT32_LE.get(decbuf, 0), 0x001a001a);
      assert.equal(Token.UINT32_LE.get(decbuf, 8), 0x001a001a);
    });
  });

});
