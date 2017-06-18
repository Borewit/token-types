// Test reading int24 values.

import {} from 'mocha';
import {assert} from 'chai';
import * as Token from '../src';
import * as util from './util';

describe("Parse 24-bit signed integer", () => {

    describe("big-endian", () => {

        it("should encode", () => {

            const buf = new Buffer(3);

            Token.INT24_BE.put(buf, 0, 0x00);
            util.checkBuffer(buf, "000000");

            Token.INT24_BE.put(buf, 0, 0x0f0ba0);
            util.checkBuffer(buf, "0f0ba0");

            Token.INT24_BE.put(buf, 0, -0x0f0bcc);
            util.checkBuffer(buf, "f0f434");
        });

        it("should decode", () => {

            const buf = new Buffer('\x00\x00\x00\xff\xff\xff\x10\x00\xff\x80\x00\x00', 'binary');

            assert.equal(Token.INT24_BE.get(buf, 0), 0);
            assert.equal(Token.INT24_BE.get(buf, 3), -1);
            assert.equal(Token.INT24_BE.get(buf, 6), 1048831);
            assert.equal(Token.INT24_BE.get(buf, 9), -8388608);

        });
    });
});




