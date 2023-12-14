# [](https://github.com/citation-js/plugin-software-formats/compare/v0.6.1...v) (2023-12-14)


### Bug Fixes

* **cff:** handle string date values ([36c5acd](https://github.com/citation-js/plugin-software-formats/commit/36c5acd7d25156f734b31f0b704b571efe123f9f))



# [](https://github.com/citation-js/plugin-software-formats/compare/v0.6.0...v) (2023-03-26)



# [0.6.0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.4...v0.6.0) (2022-05-30)


* chore!: raise minimal Node.js version ([8ae033e](https://github.com/citation-js/citation.js-plugin-software-formats/commit/8ae033e5352edf1a6aca20867b9e9d9384b7ad75))


### Features

* update mappings to CSL v1.0.2 ([9142eae](https://github.com/citation-js/citation.js-plugin-software-formats/commit/9142eae1bb86adc09e3e0d76e5679c34b582df44))


### BREAKING CHANGES

* Use Node.js 14 or higher



## [0.5.4](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.3...v0.5.4) (2022-05-07)


### Features

* **cff:** update to CFF v1.2.0 ([e4851bc](https://github.com/citation-js/citation.js-plugin-software-formats/commit/e4851bc0fd8a08e2b71e657b859a6484843615c5))



## [0.5.3](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.2...v0.5.3) (2022-04-10)


### Bug Fixes

* **cff:** do not rely on end of page range to exist ([736a358](https://github.com/citation-js/citation.js-plugin-software-formats/commit/736a358c72e9b8659a34ffb2596af0efe81ce352))
* escape dots in predicate patterns ([b89bc50](https://github.com/citation-js/citation.js-plugin-software-formats/commit/b89bc50329d9ad0966e7655750a999278bc421ee)), closes [#12](https://github.com/citation-js/citation.js-plugin-software-formats/issues/12)



## [0.5.2](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.1...v0.5.2) (2021-07-29)


### Bug Fixes

* **cff:** drop timestamp of dates in YAML ([97a81c0](https://github.com/citation-js/citation.js-plugin-software-formats/commit/97a81c0c9a9756bfa5a30505202c0b2f3cde163b))
* **gh:** fix version extractor for tag-less repos ([93fe225](https://github.com/citation-js/citation.js-plugin-software-formats/commit/93fe225ddb219621d8d4a372e55cc509c8e6dec6))



## [0.5.1](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.0...v0.5.1) (2021-07-28)


### Features

* **zenodo:** support .zenodo.json ([8a7e0a2](https://github.com/citation-js/citation.js-plugin-software-formats/commit/8a7e0a297677425c32d3303896a07fe44fcb6483))



# [0.5.0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.5.0-0...v0.5.0) (2021-05-21)



# [0.5.0-0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.4.2...v0.5.0-0) (2021-05-19)


### Bug Fixes

* **cff:** fix new converter ([2491f20](https://github.com/citation-js/citation.js-plugin-software-formats/commit/2491f207a2b292a55a6dce8a9e36766967d5c964))
* **npm:** fix npm plugin name -> [@npm](https://github.com/npm) ([ff3ca0d](https://github.com/citation-js/citation.js-plugin-software-formats/commit/ff3ca0dab80de9ac1af28f544bad84a92ea4399f))


### chore

* replace yamljs with js-yaml ([165cb95](https://github.com/citation-js/citation.js-plugin-software-formats/commit/165cb95130d1ddbdcbfe5a5245a2eeb2f439b6bc))


### Features

* **cff:** update to CFF 1.1.0 ([810c8a5](https://github.com/citation-js/citation.js-plugin-software-formats/commit/810c8a5522bd7902fd27bbe290dda0606e7149dd))
* **gh:** add version number ([d8b2bac](https://github.com/citation-js/citation.js-plugin-software-formats/commit/d8b2bac3188c9cd95f3306bc8662d5043b2ffad9))
* **gh:** make GitHub token writeable only ([783418d](https://github.com/citation-js/citation.js-plugin-software-formats/commit/783418dfde0ecad7a8cfc6938a0a9611345034a1))


### BREAKING CHANGES

* YAML output may look different
* **gh:** set the GitHub OAuth token with
Cite.plugins.config.get('@github').setApiToken(OAUTH_TOKEN)
instead.



## [0.4.2](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.4.1...v0.4.2) (2020-12-21)


### Bug Fixes

* **cff:** date output for missing day/month ([2913217](https://github.com/citation-js/citation.js-plugin-software-formats/commit/2913217c3717fbfe629c173ab6d5c258b250c936))



## [0.4.1](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.4.0...v0.4.1) (2019-10-15)

* update Citation.js (peer) dependency to 0.5.0 alpha ([422500f](https://github.com/citation-js/citation.js-plugin-software-formats/commit/422500f05f31283dbee9263f6475057becf1c193))

# [0.4.0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.3.2...v0.4.0) (2019-10-13)


* chore!: drop Node 6 support ([f0d3ccb](https://github.com/citation-js/citation.js-plugin-software-formats/commit/f0d3ccbc518fe130346bbb115d72c0530a59a034))
* chore!: remove browser build ([011463a](https://github.com/citation-js/citation.js-plugin-software-formats/commit/011463a0069b657ae0d20e3fb53e24f73453d44d))


### BREAKING CHANGES

* drop Node 6 support
* no browser build



## [0.3.2](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.3.1...v0.3.2) (2019-05-24)


### Bug Fixes

* **gh:** fix nameless contributors ([897a5ec](https://github.com/citation-js/citation.js-plugin-software-formats/commit/897a5ecb4e197ce09f96e3e6490be3d362f46304))

## [0.3.1](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.3.0...v0.3.1) (2018-12-30)

### Bug Fixes

* **cff:** fix library reference ([309104f](https://github.com/citation-js/citation.js-plugin-software-formats/commit/309104f4aa1b3b09b468c214594a5ca7e4d9b1de))

# [0.3.0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.2.2...v0.3.0) (2018-12-30)

### Bug Fixes

* fix browser builds ([fbeca54](https://github.com/citation-js/citation.js-plugin-software-formats/commit/fbeca54a6047f17aaf33d263a304c56b22cad6d1))

## [0.2.2](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.2.1...v0.2.2) (2018-12-30)

## Features

* **npm:** add npm plugin ([bf9b1ba](https://github.com/citation-js/citation.js-plugin-software-formats/commit/2913217c3717fbfe629c173ab6d5c258b250c936))

## [0.2.1](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.2.0...v0.2.1) (2018-08-02)

## Features

* **gh:** add option to use OAuth token for API ([fc82c9b](https://github.com/citation-js/citation.js-plugin-software-formats/commit/fc82c9b233633ee6df4589d985a807b772a0fd4e))

# [0.2.0](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.1.2...v0.2.0) (2018-07-31)

* update plugin registration ([f07cfe6](https://github.com/citation-js/citation.js-plugin-software-formats/commit/f07cfe6d8509ca6f3cd9b4d202f1eb8883b6ea4c))

## Features

* **gh:** add GitHub plugin ([c99a649](https://github.com/citation-js/citation.js-plugin-software-formats/commit/c99a6490f557e6585d918ebf53ea5cb0edbb0358))

### Bug Fixes

* **cff:** fix tests & bugs from failed tests ([e4323ce](https://github.com/citation-js/citation.js-plugin-software-formats/commit/e4323ce24a04ad3abb39267efe3012f4744cdc24))

## [0.1.2](https://github.com/citation-js/citation.js-plugin-software-formats/compare/v0.1.1...v0.1.2) (2018-05-21)

### Bug Fixes

* **cff:** set type='software' on main ref ([7bc10a6](https://github.com/citation-js/citation.js-plugin-software-formats/commit/7bc10a6622f15b0162e4834306ef76d1a281f32d))

## 0.1.1 (2018-05-21)
