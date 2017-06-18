[![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![npm downloads][npm-downloads-image]][npm-url]

A primitive token library used to encode and decode common data primitives
for and and to a node `Buffer`.

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