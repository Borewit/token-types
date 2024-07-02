// Test reading int64 values.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 64-bit signed integer', () => {

  describe('big-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(8);

      Token.INT64_BE.put(buf, 0, BigInt(0x01));
      util.checkBuffer(buf, '0000000000000001');

      Token.INT64_BE.put(buf, 0, BigInt(0x0000ffbbeeddccaa));
      util.checkBuffer(buf, '0000ffbbeeddccaa');

      Token.INT64_BE.put(buf, 0, BigInt(-1));
      util.checkBuffer(buf, 'ffffffffffffffff');
    });

    it('should decode', () => {

      assert.strictEqual(Token.INT64_BE.get(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 0), BigInt(0));
      assert.strictEqual(Token.INT64_BE.get(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]), 0), BigInt(-1));

    });

  });

  describe('little-endian', () => {

    it('should encode', () => {

      const buf = new Uint8Array(8);

      Token.INT64_LE.put(buf, 0, BigInt(0x00));
      util.checkBuffer(buf, '0000000000000000');

      Token.INT64_LE.put(buf, 0, BigInt(0x0000ffbbeeddccaa));
      util.checkBuffer(buf, 'aaccddeebbff0000');

      Token.INT64_LE.put(buf, 0, BigInt(-1));
      util.checkBuffer(buf, 'ffffffffffffffff');
    });

    it('should decode', () => {

      let buf = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);

      assert.strictEqual(Token.INT64_LE.get(buf, 0), BigInt(0));
      assert.strictEqual(Token.INT64_LE.get(buf, 8), BigInt(-1));

      buf = new Uint8Array([0xaa, 0xcc, 0xdd, 0xee, 0xbb, 0xff, 0x00, 0x00, 0xbb, 0xcc, 0xdd, 0xee, 0xbb, 0xff, 0x00, 0x00]);
      assert.strictEqual(Token.INT64_LE.get(buf, 0), BigInt(0x0000ffbbeeddccaa));
      assert.strictEqual(Token.INT64_LE.get(buf, 8), BigInt(0x0000ffbbeeddccbb));

    });

  });
});
