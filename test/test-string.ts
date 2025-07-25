import { assert } from 'chai';
import { AnsiStringType, StringType } from '../lib/index.js';

/* eslint-disable max-len */

describe('text decoding', () => {

  it('should decode from latin1', () => {
    assert.strictEqual(new StringType(4, 'latin1').get(new Uint8Array([0x41, 0x42, 0x43, 0x44])), 'ABCD');
  });

  it('should decode from ascii', () => {
    assert.strictEqual(new StringType(4, 'ascii').get(new Uint8Array([0x41, 0x42, 0x43, 0x44])), 'ABCD');
  });
});

describe('Decode ANSI-string (Windows-1252)', () => {

  it('should decode from AnsiStringType', () => {

    function decode(uint8Array: Uint8Array): string {
      const ansiStr = new AnsiStringType(uint8Array.length);
      return ansiStr.get(uint8Array);
    }

    assert.equal(
      decode(new Uint8Array(new Array(128).fill(0).map((_, index) => index))),
      '\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0B\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F',
      'U+0000 to U+007F remain unchanged'
    );
    assert.equal(
      decode(new Uint8Array(new Array(128).fill(0).map((_, index) => index + 128))),
      '\u20AC\x81\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\x8D\u017D\x8F\x90\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\x9D\u017E\u0178\xA0\xA1\xA2\xA3\xA4\xA5\xA6\xA7\xA8\xA9\xAA\xAB\xAC\xAD\xAE\xAF\xB0\xB1\xB2\xB3\xB4\xB5\xB6\xB7\xB8\xB9\xBA\xBB\xBC\xBD\xBE\xBF\xC0\xC1\xC2\xC3\xC4\xC5\xC6\xC7\xC8\xC9\xCA\xCB\xCC\xCD\xCE\xCF\xD0\xD1\xD2\xD3\xD4\xD5\xD6\xD7\xD8\xD9\xDA\xDB\xDC\xDD\xDE\xDF\xE0\xE1\xE2\xE3\xE4\xE5\xE6\xE7\xE8\xE9\xEA\xEB\xEC\xED\xEE\xEF\xF0\xF1\xF2\xF3\xF4\xF5\xF6\xF7\xF8\xF9\xFA\xFB\xFC\xFD\xFE\xFF',
      'Decoding all other symbols in the character set'
    );
  });

  it('should decode "windows-1252" decoding in StringType', () => {

    function decode(uint8Array: Uint8Array): string {
      const ansiStr = new StringType(uint8Array.length, 'windows-1252');
      return ansiStr.get(uint8Array);
    }

    assert.equal(
      decode(new Uint8Array(new Array(128).fill(0).map((_, index) => index))),
      '\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0B\f\r\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\x7F',
      'U+0000 to U+007F remain unchanged'
    );
    assert.equal(
      decode(new Uint8Array(new Array(128).fill(0).map((_, index) => index + 128))),
      '\u20AC\x81\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\x8D\u017D\x8F\x90\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\x9D\u017E\u0178\xA0\xA1\xA2\xA3\xA4\xA5\xA6\xA7\xA8\xA9\xAA\xAB\xAC\xAD\xAE\xAF\xB0\xB1\xB2\xB3\xB4\xB5\xB6\xB7\xB8\xB9\xBA\xBB\xBC\xBD\xBE\xBF\xC0\xC1\xC2\xC3\xC4\xC5\xC6\xC7\xC8\xC9\xCA\xCB\xCC\xCD\xCE\xCF\xD0\xD1\xD2\xD3\xD4\xD5\xD6\xD7\xD8\xD9\xDA\xDB\xDC\xDD\xDE\xDF\xE0\xE1\xE2\xE3\xE4\xE5\xE6\xE7\xE8\xE9\xEA\xEB\xEC\xED\xEE\xEF\xF0\xF1\xF2\xF3\xF4\xF5\xF6\xF7\xF8\xF9\xFA\xFB\xFC\xFD\xFE\xFF',
      'Decoding all other symbols in the character set'
    );
  });
});
