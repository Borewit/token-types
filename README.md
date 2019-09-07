[![Build Status](https://travis-ci.org/Borewit/token-types.svg?branch=master)](https://travis-ci.org/Borewit/token-types)
[![NPM version](https://badge.fury.io/js/token-types.svg)](https://npmjs.org/package/token-types)
[![npm downloads](http://img.shields.io/npm/dm/token-types.svg)](https://npmjs.org/package/token-types)
[![Dependencies](https://david-dm.org/Borewit/token-types.svg)](https://david-dm.org/Borewit/token-types)
[![coveralls](https://coveralls.io/repos/github/Borewit/token-types/badge.svg?branch=master)](https://coveralls.io/github/Borewit/token-types?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4723ce4613fc49cda8db5eed29f18834)](https://www.codacy.com/app/Borewit/token-types?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Borewit/token-types&amp;utm_campaign=Badge_Grade)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Borewit/token-types.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Borewit/token-types/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Borewit/token-types.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Borewit/token-types/alerts/)
[![DeepScan grade](https://deepscan.io/api/teams/5165/projects/6940/branches/61852/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5165&pid=6940&bid=61852)
[![Known Vulnerabilities](https://snyk.io/test/github/Borewit/token-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Borewit/token-types?targetFile=package.json)

A primitive token library used to read from, and to write a node `Buffer`.

### Tokens

`node-strtok` supports a wide variety of numerical tokens out of the box:

*   `UINT8`
*   `UINT16_BE`, `UINT16_LE`
*   `UINT24_BE`, `UINT24_LE`
*   `UINT32_BE`, `UINT32_LE`
*   `UINT64_BE`, `UINT64_LE`*
*   `INT8`
*   `INT16_BE`, `INT16_LE`
*   `INT24_BE`, `INT24_LE`
*   `INT32_BE`, `INT32_LE`
*   `INT64_BE`, `UINT64_LE`*

String types:
*   Windows-1252
*   ISO-8859-1
  
*) The 64-bit tokens are best effort based, since JavaScript limit value size to less than 2^64.

Complex tokens can be added, which makes very suitable for reading binary files or network messages:
```javascript
 ExtendedHeader = {
    len: 10,

    get: (buf, off) => {
      return {
        // Extended header size
        size: Token.UINT32_BE.get(buf, off),
        // Extended Flags
        extendedFlags: Token.UINT16_BE.get(buf, off + 4),
        // Size of padding
        sizeOfPadding: Token.UINT32_BE.get(buf, off + 6),
        // CRC data present
        crcDataPresent: common.strtokBITSET.get(buf, off + 4, 31)
      };
    }
  };
```
