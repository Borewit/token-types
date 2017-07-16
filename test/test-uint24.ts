// Test writing and reading uint24 values in different endiannesses.

import {} from 'mocha';
import {assert} from 'chai';
import * as Token from '../lib';
import * as util from './util';

describe("Parse 24-bit unsigned integer", () => {

    describe("combined little- and big-endian", () => {

        it("should encode", () => {

            const buf = new Buffer(3);

            Token.UINT24_LE.put(buf, 0, 0x00);
            util.checkBuffer(buf, "000000");

            Token.UINT24_LE.put(buf, 0, 0xff);
            util.checkBuffer(buf, "ff0000");

            Token.UINT24_BE.put(buf, 0, 0x00);
            util.checkBuffer(buf, "000000");

            Token.UINT24_BE.put(buf, 0, 0xff);
            util.checkBuffer(buf, "0000ff");

            Token.UINT24_LE.put(buf, 0, 0xaabbcc);
            util.checkBuffer(buf, "ccbbaa");

            Token.UINT24_BE.put(buf, 0, 0xaabbcc);
            util.checkBuffer(buf, "aabbcc");
        });

        it("should decode", () => {

            const buf = new Buffer('\x1a\x1a\x00\x1a\x1a\x00\x1a\x1a\x00\x1a\x1a\x00', 'binary');

            assert.equal(Token.UINT24_LE.get(buf, 0), 0x001a1a);
            assert.equal(Token.UINT24_BE.get(buf, 3), 0x1a1a00);
            assert.equal(Token.UINT24_LE.get(buf, 6), 0x001a1a);
            assert.equal(Token.UINT24_BE.get(buf, 9), 0x1a1a00);
        });
    });
});
