This plugin adds support for [Citation File Format (CFF)](http://citation-file-format.github.io/citation-file-format)
files, both as YAML and in the non-standard JSON form.

## Install

### npm

```js
npm install @citation-js/plugin-cff
```

### Browser

Make a build with `@citation-js/plugin-cff` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Register the plugin by `require`-ing it:

```js
require('@citation-js/plugin-cff')
```

## Formats

### Input

```yml
# Example from https://github.com/citation-file-format/citation-file-format#example

cff-version: 1.2.0
message: If you use this software, please cite it as below.
type: software
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
```

becomes

```js
{
  author: [ { family: 'Druskat', given: 'Stephan' } ],
  issued: { 'date-parts': [ [2017, 12, 18] ] },
  DOI: '10.5281/zenodo.1234',
  title: 'My Research Tool',
  version: '1.0.4',
  type: 'book',
  _cff_mainReference: true
}
```

### Output

If you pass multiple references the first counts as the main reference, while the
rest are added in the `references` list. To specify a different entry as the main
reference, pass the entry ID in the `main` option:

```js
Cite(/* ... */).format('cff', {
  main: '...'
})
```

Alternatively, the entry can have `_cff_mainReference` set to `true`, but that
is mainly used for round-tripping.

To specify the preferred citation, pass the entry ID in the `preferred` option.

To generate CFF `1.1.0` output, pass `'1.1.0'` to the `cffVersion` option.

You can also specify the message, a mandatory part of every CFF file. By default,
the message is:

> Please cite the following works when using this software.

To change it, pass a string to the `message` option when formatting:

```js
Cite(/* ... */).format('cff', {
  message: 'If you use this software, please cite it as below.'
})
```
