// Test writing and reading uint24 values in different endiannesses.

import { assert } from 'chai';
import { Buffer } from 'node:buffer';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 24-bit unsigned integer', () => {

  describe('big-endian', () => {

    it('should encode', () => {

      const buf = Buffer.alloc(3);

      Token.UINT24_BE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '000000');

      Token.UINT24_BE.put(buf, 0, 0xff);
      util.checkBuffer(buf, '0000ff');

      Token.UINT24_BE.put(buf, 0, 0xaabbcc);
      util.checkBuffer(buf, 'aabbcc');
    });

    it('should decode', () => {

      const buf = Buffer.from('\x00\x00\x00\x1a\x1a\x00\xff\xff\xff', 'binary');
      assert.strictEqual(Token.UINT24_BE.get(buf, 0), 0x000000);
      assert.strictEqual(Token.UINT24_BE.get(buf, 3), 0x1a1a00);
      assert.strictEqual(Token.UINT24_BE.get(buf, 6), 0xffffff);
    });

  });

  describe('little-endian', () => {

    it('should encode', () => {

      const buf = Buffer.alloc(3);

      Token.UINT24_LE.put(buf, 0, 0x00);
      util.checkBuffer(buf, '000000');

      Token.UINT24_LE.put(buf, 0, 0xff);
      util.checkBuffer(buf, 'ff0000');

      Token.UINT24_LE.put(buf, 0, 0xaabbcc);
      util.checkBuffer(buf, 'ccbbaa');
    });

    it('should decode', () => {

      const buf = Buffer.from('\x00\x00\x00\x1a\x1a\x00\xff\xff\xff', 'binary');

      assert.strictEqual(Token.UINT24_LE.get(buf, 0), 0x000000);
      assert.strictEqual(Token.UINT24_LE.get(buf, 3), 0x001a1a);
      assert.strictEqual(Token.UINT24_LE.get(buf, 6), 0xffffff);
    });

  });
});
