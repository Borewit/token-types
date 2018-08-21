[![Build Status](https://travis-ci.org/Borewit/token-types.svg?branch=master)](https://travis-ci.org/Borewit/token-types)
[![NPM version](https://badge.fury.io/js/token-types.svg)](https://npmjs.org/package/token-types)
[![npm downloads](http://img.shields.io/npm/dm/token-types.svg)](https://npmjs.org/package/token-types)
[![Dependencies](https://david-dm.org/Borewit/token-types.svg)](https://david-dm.org/Borewit/token-types)
[![coveralls](https://coveralls.io/repos/github/Borewit/token-types/badge.svg?branch=master)](https://coveralls.io/github/Borewit/token-types?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/borewit/projects/a193313e-00be-4611-bcba-f68773e5704c/badge)](https://nodesecurity.io/orgs/borewit/projects/a193313e-00be-4611-bcba-f68773e5704c)

A primitive token library used to read from, and to write a node `Buffer`.

### Tokens

`node-strtok` supports a wide variety of numerical tokens out of the box:

* `UINT8`
* `UINT16_BE`, `UINT16_LE`
* `UINT24_BE`, `UINT24_LE`
* `UINT32_BE`, `UINT32_LE`
* `UINT64_BE`, `UINT64_LE` *
* `INT8`
* `INT16_BE`, `INT16_LE`
* `INT24_BE`, `INT24_LE`
* `INT32_BE`, `INT32_LE`
* `INT64_BE`, `UINT64_LE` *

String types:
* Windows-1252
* ISO-8859-1

*) The 64-bit tokens are best effort based, since JavaScript limit value size to less than 2^64. 
      
[npm-url]: https://npmjs.org/package/token-types
[npm-image]: https://badge.fury.io/js/token-types.svg
[npm-downloads-image]: http://img.shields.io/npm/dm/token-types.svg

[travis-url]: https://travis-ci.org/Borewit/token-types
[travis-image]: https://api.travis-ci.org/Borewit/token-types.svg?branch=master

[coveralls-url]: https://coveralls.io/github/Borewit/token-types?branch=master
[coveralls-image]: https://coveralls.io/repos/github/Borewit/token-types/badge.svg?branch=master