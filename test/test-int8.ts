// Test reading int8 values.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 8-bit signed integer (INT8)', () => {

  it('should encode', () => {

    const buf = new Uint8Array(1);

    Token.INT8.put(buf, 0, 0x00);
    util.checkBuffer(buf, '00');

    Token.INT8.put(buf, 0, 0x22);
    util.checkBuffer(buf, '22');

    Token.INT8.put(buf, 0, -0x22);
    util.checkBuffer(buf, 'de');
  });

  it('should decode', () => {

    const buf = new Uint8Array([0x00, 0x7f, 0x80, 0xff, 0x81]);

    assert.strictEqual(Token.INT8.get(buf, 0), 0);
    assert.strictEqual(Token.INT8.get(buf, 1), 127);
    assert.strictEqual(Token.INT8.get(buf, 2), -128);
    assert.strictEqual(Token.INT8.get(buf, 3), -1);
    assert.strictEqual(Token.INT8.get(buf, 4), -127);

  });
});
