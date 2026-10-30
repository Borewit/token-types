import { assert } from 'chai';
import { StringType, Uint8ArrayType } from '../lib/index.js';

describe('Uint8ArrayType', () => {
  it('should not copy data from the source array', () => {
    const source = Uint8Array.from([0xa1, 0xa2, 0xb1, 0xb2, 0xc1, 0xc2]);

    const uint8ArrayType = new Uint8ArrayType(2);
    const bufferResult = uint8ArrayType.get(source, 2);

    assert.deepStrictEqual(bufferResult, Uint8Array.from([0xb1, 0xb2]), 'should be 2 middle bytes: 0xb1, 0xb2');

    // Overwrite the result
    bufferResult[0] = 0xd1;
    bufferResult[1] = 0xd2;

    assert.deepStrictEqual(source, Uint8Array.from([0xa1, 0xa2, 0xd1, 0xd2, 0xc1, 0xc2]), 'should not copy the data');
  });

  it('should encode a fixed-size byte array', () => {
    const buffer = new Uint8Array(6);
    const uint8ArrayType = new Uint8ArrayType(2);

    const nextOffset = uint8ArrayType.put(buffer, 2, Uint8Array.from([0xb1, 0xb2]));

    assert.strictEqual(nextOffset, 4);
    assert.deepStrictEqual(buffer, Uint8Array.from([0, 0, 0xb1, 0xb2, 0, 0]));
  });

  it('should reject a value with the wrong length', () => {
    const uint8ArrayType = new Uint8ArrayType(2);

    assert.throws(() => uint8ArrayType.put(new Uint8Array(2), 0, Uint8Array.from([1])), RangeError);
  });
});

describe('StringType', () => {
  it('decode from Buffer', () => {
    const source = new Uint8Array(Buffer.from('peter', 'utf8'));

    const stringType = new StringType(5, 'utf8');

    assert.strictEqual(stringType.get(source, 0), 'peter');
  });

  it('should encode a fixed-size UTF-8 string', () => {
    const buffer = new Uint8Array(8);
    const stringType = new StringType(6, 'utf-8');

    const nextOffset = stringType.put(buffer, 1, 'héllo');

    assert.strictEqual(nextOffset, 7);
    assert.strictEqual(new StringType(6, 'utf-8').get(buffer, 1), 'héllo');
  });

  it('should encode a fixed-size ASCII string', () => {
    const buffer = new Uint8Array(4);

    new StringType(4, 'ascii').put(buffer, 0, 'fLaC');

    assert.deepStrictEqual(buffer, new Uint8Array([0x66, 0x4c, 0x61, 0x43]));
  });

  it('should reject a value with the wrong encoded length', () => {
    const stringType = new StringType(4, 'utf-8');

    assert.throws(() => stringType.put(new Uint8Array(4), 0, 'hello'), RangeError);
  });
});
