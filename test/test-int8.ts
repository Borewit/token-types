// Test reading int8 values.

import {} from 'mocha';
import {assert} from 'chai';
import * as Token from '../src';
import * as util from './util';

describe("Parse 8-bit signed integer (INT8)", () => {

  it("should encode", () => {

    const buf = new Buffer(1);

    Token.INT8.put(buf, 0, 0x00);
    util.checkBuffer(buf, "00");

    Token.INT8.put(buf, 0, 0x22);
    util.checkBuffer(buf, "22");

    Token.INT8.put(buf, 0, -0x22);
    util.checkBuffer(buf, "de");
  });

  it("should decode", () => {

    const buf = new Buffer('\x00\x7f\x80\xff\x81', 'binary');

    assert.equal(Token.INT8.get(buf, 0), 0);
    assert.equal(Token.INT8.get(buf, 1), 127);
    assert.equal(Token.INT8.get(buf, 2), -128);
    assert.equal(Token.INT8.get(buf, 3), -1);
    assert.equal(Token.INT8.get(buf, 4), -127);

  });
});
