// Test writing and reading uint32 values in different endiannesses.

import {} from "mocha";
import {assert} from 'chai';
import * as Token from '../lib';
import * as util from './util';

describe("Parse 32-bit unsigned integer", () => {

    describe("combined little- and big-endian", () => {

        describe("encode", () => {

            const buf = new Buffer(4);

            it("should encode big-endian", () => {

                Token.UINT32_BE.put(buf, 0, 0x00);
                util.checkBuffer(buf, "00000000");

                Token.UINT32_BE.put(buf, 0, 0xff);
                util.checkBuffer(buf, "000000ff");

                Token.UINT32_BE.put(buf, 0, 0xaabbccdd);
                util.checkBuffer(buf, "aabbccdd");

            });

            it("should encode litle-endian", () => {

                Token.UINT32_LE.put(buf, 0, 0x00);
                util.checkBuffer(buf, "00000000");

                Token.UINT32_LE.put(buf, 0, 0xff);
                util.checkBuffer(buf, "ff000000");

                Token.UINT32_LE.put(buf, 0, 0xaabbccdd);
                util.checkBuffer(buf, "ddccbbaa");
            });
        });

        it("should decode", () => {

            const buf = new Buffer('\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00', 'binary');

            assert.equal(Token.UINT32_LE.get(buf, 0), 0x001a001a);
            assert.equal(Token.UINT32_BE.get(buf, 4), 0x1a001a00);
            assert.equal(Token.UINT32_LE.get(buf, 8), 0x001a001a);
            assert.equal(Token.UINT32_BE.get(buf, 12), 0x1a001a00);
        });

    });
});
