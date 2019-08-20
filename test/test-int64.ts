// Test reading int64 values.

import {} from 'mocha';
import {assert} from 'chai';
import * as Token from '../lib';
import * as util from './util';

describe("Parse 64-bit signed integer", () => {

    describe("big-endian", () => {

        it("should encode", () => {

            const buf = Buffer.alloc(8);

            Token.INT64_BE.put(buf, 0, 0x01);
            util.checkBuffer(buf, "0000000000000001");

            Token.INT64_BE.put(buf, 0, 0x0000ffbbeeddccaa);
            util.checkBuffer(buf, "0000ffbbeeddccaa");

            Token.INT64_BE.put(buf, 0, -1);
            util.checkBuffer(buf, "ffffffffffffffff");
        });

        it("should decode", () => {

            assert.equal(Token.INT64_BE.get(Buffer.from('\x00\x00\x00\x00\x00\x00\x00\x00', 'binary'), 0), 0);
            assert.approximately(Token.INT64_BE.get(Buffer.from('\xff\xff\xff\xff\xff\xff\xff\xff', 'binary'), 0), -1, 1);

        });

    });

    describe("little-endian", () => {

        it("should encode", () => {

            const buf = Buffer.alloc(8);

            Token.INT64_LE.put(buf, 0, 0x00);
            util.checkBuffer(buf, "0000000000000000");

            Token.INT64_LE.put(buf, 0, 0x0000ffbbeeddccaa);
            util.checkBuffer(buf, "aaccddeebbff0000");

            Token.INT64_LE.put(buf, 0, -1);
            util.checkBuffer(buf, "ffffffffffffffff");
        });

        it("should decode", () => {

            let buf = Buffer.from('\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\xff\xff\xff\xff', 'binary');

            assert.equal(Token.INT64_LE.get(buf, 0), 0);
            assert.approximately(Token.INT64_LE.get(buf, 8), -1, 1);

            buf = Buffer.from('\xaa\xcc\xdd\xee\xbb\xff\x00\x00\xbb\xcc\xdd\xee\xbb\xff\x00\x00', 'binary');
            assert.equal(Token.INT64_LE.get(buf, 0), 0x0000ffbbeeddccaa);
            assert.equal(Token.INT64_LE.get(buf, 8), 0x0000ffbbeeddccbb);

        });

    });
});
