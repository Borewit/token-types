// Test writing and reading uint8 values.

import { assert } from 'chai';
import * as Token from '../lib/index.js';
import * as util from './util.js';

describe('Parse 8-bit unsigned integer (UINT8)', () => {

  it('should encode', () => {

    const buf = new Uint8Array(1);

    Token.UINT8.put(buf, 0, 0x00);
    util.checkBuffer(buf, '00');

    Token.UINT8.put(buf, 0, 0x22);
    util.checkBuffer(buf, '22');

    Token.UINT8.put(buf, 0, 0xff);
    util.checkBuffer(buf, 'ff');
  });

  it('should decode', () => {

    const buf = new Uint8Array([0x00, 0x1a, 0x01, 0xff]);

    assert.equal(Token.UINT8.get(buf, 0), 0);
    assert.equal(Token.UINT8.get(buf, 1), 26);
    assert.equal(Token.UINT8.get(buf, 2), 1);
    assert.equal(Token.UINT8.get(buf, 3), 255);

  });
});
