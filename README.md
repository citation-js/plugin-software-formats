## Install

### npm

```js
npm install @citation-js/plugin-software-formats
```

### Browser

```html
<!-- Regular -->
<script src="https://unpkg.com/@citation-js/plugin-software-formats@0.1.0/build/citation-software.js"></script>
<!-- OR Minified -->
<script src="https://unpkg.com/@citation-js/plugin-software-formats@0.1.0/build/citation-software.min.js"></script>
```

Replace `0.1.0` with the version you want.

Include this script after including `citation-js`

## Use

Install the plugin by `require`-ing it:

```js
require('@citation-js/plugin-software-formats')
```

## Formats

Formats and other features added by this plugin.

### Input

#### YAML

This plugin adds support for YAML files. This is done with the [`yamljs` package](https://www.npmjs.com/package/yamljs).

#### CFF

This plugin adds support for [Citation File Format (CFF)](http://citation-file-format.github.io/citation-file-format) files, both in YAML and in JSON form.

```yml
cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
```

[Source](https://github.com/citation-file-format/citation-file-format#example)

### Output

#### CFF

This plugin supports CFF output, both in YAML and in JSON form.
