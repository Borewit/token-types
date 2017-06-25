[![NPM version][npm-image]][npm-url] 
[![npm downloads][npm-downloads-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![coveralls][coveralls-image]][coveralls-url]

A primitive token library used to read from, and to write a node `Buffer`.

### Tokens

`node-strtok` supports a wide variety of numerical tokens out of the box:

* `UINT8`
* `UINT16_BE`, `UINT16_LE`
* `UINT24_BE`, `UINT24_LE`
* `UINT32_BE`, `UINT32_LE`
* `INT8`
* `INT16_BE`
* `INT24_BE`, `INT24_LE`
* `INT32_BE`

One might notice that there is no support for 64-bit tokens, since JavaScript
seems to limit value size to less than 2^64. Rather than wrapping up an
additional math library to handle this, I wanted to stick with JavaScript
primitives. Maybe this will change later if this becomes important.
      
[npm-url]: https://npmjs.org/package/token-types
[npm-image]: https://badge.fury.io/js/token-types.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/token-types.svg

[travis-url]: https://travis-ci.org/Borewit/token-types
[travis-image]: https://api.travis-ci.org/Borewit/token-types.svg?branch=master

[coveralls-url]: https://coveralls.io/github/Borewit/token-types?branch=master
[coveralls-image]: https://coveralls.io/repos/github/Borewit/token-types/badge.svg?branch=master