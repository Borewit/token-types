import { assert } from 'chai';
import { StringType, Uint8ArrayType } from '../lib/index.js';

describe('Uint8ArrayType', () => {

  it('should should not copy data fom the source array', () => {

    const source = Uint8Array.from([0xa1, 0xa2, 0xb1, 0xb2, 0xc1, 0xc2]);

    const uint8ArrayType = new Uint8ArrayType(2);
    const bufferResult = uint8ArrayType.get(source, 2);

    assert.deepStrictEqual(bufferResult,  Uint8Array.from([0xb1, 0xb2]), 'should be 2 middle bytes: 0xb1, 0xb2');

    // Overwrite the result
    bufferResult[0] = 0xd1;
    bufferResult[1] = 0xd2;

    assert.deepStrictEqual(source,  Uint8Array.from([0xa1, 0xa2, 0xd1, 0xd2, 0xc1, 0xc2]), 'should not copy the data');
  });
});

describe('StringType', () => {

  it('decode from Buffer', () => {

    const source = new Uint8Array(Buffer.from('peter', 'utf8'));

    const stringType = new StringType(5, 'utf8');

    assert.strictEqual(stringType.get(source, 0),  'peter', 'should be 2 middle bytes: 0xb1, 0xb2');
  });
});
