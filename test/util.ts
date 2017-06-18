import {assert} from 'chai';

export const checkBuffer = function (buf: Buffer, hexStr: string) {
    assert.equal(buf.toString('hex'), hexStr);
};