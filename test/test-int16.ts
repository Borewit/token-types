// Test reading int16 values.

import {} from 'mocha';
import {assert} from 'chai';
import * as Token from '../src';
import * as util from './util';

describe("Parse 16-bit signed integer", () => {

    describe("big-endian", () => {

        it("should encode", () => {

            const buf = new Buffer(2);

            Token.INT16_BE.put(buf, 0, 0x00);
            util.checkBuffer(buf, "0000");

            Token.INT16_BE.put(buf, 0, 0x0f0b);
            util.checkBuffer(buf, "0f0b");

            Token.INT16_BE.put(buf, 0, -0x0f0b);
            util.checkBuffer(buf, "f0f5");
        });

        it("should decode", () => {

            const buf = new Buffer('\x0a\x1a\x00\x00\xff\xff\x80\x00', 'binary');

            assert.equal(Token.INT16_BE.get(buf, 0), 2586);
            assert.equal(Token.INT16_BE.get(buf, 2), 0);
            assert.equal(Token.INT16_BE.get(buf, 4), -1);
            assert.equal(Token.INT16_BE.get(buf, 6), -32768);

        });
    });

    /* ToDO
    describe("little-endian", () => {

        it("should encode", () => {

            util.runGenerateTests(
                [(b) => {
                    return Token.INT16_LE.put(b, 0, 0x00);
                }, '\x00\x00'],
                [(b) => {
                    return Token.INT16_LE.put(b, 0, 0x0f0b);
                }, '\x0b\x0f'],
                [(b) => {
                    return Token.INT16_LE.put(b, 0, -0x0f0b);
                }, '\xf5\xf0']
            );

        });

        it("should decode", () => {

            util.runParseTests('\x1a\x0a\x00\x00\xff\xff\x00\x80', [
                (v) =>{
                    assert.ok(v === undefined);
                    return Token.INT16_LE;
                },
                (v) =>{
                    assert.equal(v, 2586);
                    return Token.INT16_LE;
                },
                (v) =>{
                    assert.equal(v, 0);
                    return Token.INT16_LE;
                },
                (v) =>{
                    assert.equal(v, -1);
                    return Token.INT16_LE;
                },
                (v) =>{
                    assert.equal(v, -32768);
                    return Token.INT16_LE;
                }
            ]);

        });
    });
    */


});
