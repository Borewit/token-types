import {assert} from 'chai';

export const checkBuffer = (buf: Buffer, hexStr: string) => {
    assert.equal(buf.toString('hex'), hexStr);
};
