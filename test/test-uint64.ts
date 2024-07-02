// Test writing and reading uint32 values in different endiannesses.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 64-bit unsigned integer', () => {

  describe('big-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(8);

      Token.UINT64_BE.put(buf, 0, BigInt(0x00));
      util.checkBuffer(buf, '0000000000000000');

      Token.UINT64_BE.put(buf, 0, BigInt(0xff));
      util.checkBuffer(buf, '00000000000000ff');

      Token.UINT64_BE.put(buf, 0, BigInt(0xaabbccddeeff));
      util.checkBuffer(buf, '0000aabbccddeeff');

      Token.UINT64_BE.put(buf, 0, BigInt(0x00123456789ABCDE));
      util.checkBuffer(buf, '00123456789abcde');
    });

    it('should decode', () => {
      const buf = new Uint8Array([0x00, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x01, 0x00, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x02]);

      assert.strictEqual(Token.UINT64_BE.get(buf, 0), BigInt(0x00001a001a001a01));
      assert.strictEqual(Token.UINT64_BE.get(buf, 8), BigInt(0x00001a001a001a02));
    });

  });

  describe('litle-endian', () => {

    it('should encode', () => {
      const buf = new Uint8Array(8);

      Token.UINT64_LE.put(buf, 0, BigInt(0x00));
      util.checkBuffer(buf, '0000000000000000');

      Token.UINT64_LE.put(buf, 0, BigInt(0xff));
      util.checkBuffer(buf, 'ff00000000000000');

      Token.UINT64_LE.put(buf, 0, BigInt(0xaabbccddeeff));
      util.checkBuffer(buf, 'ffeeddccbbaa0000');

      Token.UINT64_LE.put(buf, 0, BigInt(0x00123456789ABCDE));
      util.checkBuffer(buf, 'debc9a7856341200');
    });

    it('should decode', () => {

      const buf = new Uint8Array([0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00]);

      it('little-endian', () => {
        assert.strictEqual(Token.UINT64_LE.get(buf, 0), BigInt(0x001a001a));
        assert.strictEqual(Token.UINT64_LE.get(buf, 8), BigInt(0x001a001a));
      });

    });

  });
});
