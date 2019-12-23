// Test writing and reading uint32 values in different endiannesses.

import {} from "mocha";
import {assert} from 'chai';
import * as Token from '..';
import * as util from './util';

describe("Parse 64-bit unsigned integer", () => {

  describe("big-endian", () => {

    it("should encode", () => {

      const buf = Buffer.alloc(8);

      Token.UINT64_BE.put(buf, 0, 0x00);
      util.checkBuffer(buf, "0000000000000000");

      Token.UINT64_BE.put(buf, 0, 0xff);
      util.checkBuffer(buf, "00000000000000ff");

      Token.UINT64_BE.put(buf, 0, 0xaabbccddeeff);
      util.checkBuffer(buf, "0000aabbccddeeff");

      Token.UINT64_BE.put(buf, 0, 0x00123456789ABCDE);
      util.checkBuffer(buf, "00123456789abcde");
    });

    it("should decode", () => {
      const buf = Buffer.from('\x00\x00\x1a\x00\x1a\x00\x1a\x01\x00\x00\x1a\x00\x1a\x00\x1a\x02', 'binary');

      assert.equal(Token.UINT64_BE.get(buf, 0), 0x00001a001a001a01);
      assert.equal(Token.UINT64_BE.get(buf, 8), 0x00001a001a001a02);
    });

  });

  describe("litle-endian", () => {

    it("should encode", () => {
      const buf = Buffer.alloc(8);

      Token.UINT64_LE.put(buf, 0, 0x00);
      util.checkBuffer(buf, "0000000000000000");

      Token.UINT64_LE.put(buf, 0, 0xff);
      util.checkBuffer(buf, "ff00000000000000");

      Token.UINT64_LE.put(buf, 0, 0xaabbccddeeff);
      util.checkBuffer(buf, "ffeeddccbbaa0000");

      Token.UINT64_LE.put(buf, 0, 0x00123456789ABCDE);
      util.checkBuffer(buf, "debc9a7856341200");
    });

    it("should decode", () => {

      const buf = Buffer.from('\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00', 'binary');

      it("little-endian", () => {
        assert.equal(Token.UINT64_LE.get(buf, 0), 0x001a001a);
        assert.equal(Token.UINT64_LE.get(buf, 8), 0x001a001a);
      });

    });

  });
});
