// Test writing and reading uint16 values in different endiannesses.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 16-bit unsigned integer', () => {

  describe('combined little- and big-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(4);

      Token.UINT16_LE.put(buf, 0, 0x00);
      Token.UINT16_LE.put(buf, 2, 0xffaa);
      util.checkBuffer(buf, '0000aaff');

      Token.UINT16_BE.put(buf, 0, 0x00);
      Token.UINT16_BE.put(buf, 2, 0xffaa);
      util.checkBuffer(buf, '0000ffaa');

      Token.UINT16_BE.put(buf, 0, 0xffaa);
      Token.UINT16_LE.put(buf, 2, 0xffaa);
      util.checkBuffer(buf, 'ffaaaaff');
    });

    it('should decode', () => {

      const buf = new Uint8Array([0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00, 0x1a, 0x00]);

      assert.equal(Token.UINT16_LE.get(buf, 0), 0x001a);
      assert.equal(Token.UINT16_BE.get(buf, 2), 0x1a00);
      assert.equal(Token.UINT16_LE.get(buf, 4), 0x001a);
      assert.equal(Token.UINT16_BE.get(buf, 6), 0x1a00);

    });

  });
});
