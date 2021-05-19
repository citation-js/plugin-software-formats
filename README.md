## Install

### npm

```js
npm install @citation-js/plugin-software-formats
```

### Browser

Make a build with `@citation-js/plugin-software-formats` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Register the plugin by `require`-ing it:

```js
require('@citation-js/plugin-software-formats')
```

## Formats

Formats and other features added by this plugin.

### Input

The CSL standard has no `type` for software, so ([by convention](https://github.com/citation-style-language/zotero-bits/issues/69)) `book` is used instead.

#### YAML

This plugin adds support for YAML files. This is done with the [`yamljs` package](https://www.npmjs.com/package/yamljs).

#### CFF

This plugin adds support for [Citation File Format (CFF)](http://citation-file-format.github.io/citation-file-format) files, both in YAML and in JSON form.

```yml
# Example from https://github.com/citation-file-format/citation-file-format#example

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

#### GitHub

This plugin can retrieve bibliographical data from the GitHub API. Note, however, that said API practices rate-limiting, namely 60 unauthorized requests per hours. Also, because the API is limited, a single source can take ~10 API requests. With authorized requests, you can make up to 5000 requests per hour. To let Citation.js make authorized requests, you can set an OAuth token. To get an OAuth token from your GitHub account, see [this guide](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You don't need to select any additional scopes. Citation.js won't do anything else with this OAuth token.

```js
Cite.plugins.config.get('@github').setApiToken(OAUTH_TOKEN)

Cite.async('https://github.com/citation-js/plugin-software-formats')

{
  type: 'book',
  'title-short': 'plugin-software-formats',
  title: 'citation-js/plugin-software-formats',
  abstract: 'Collection of software-related input and output formats for Citation.js',
  URL: 'https://github.com/citation-js/plugin-software-formats',
  issued: { 'date-parts': [ [2020, 30, 21] ] },
  author: [ { given: 'Lars', family: 'Willighagen' } ],
  version: 'v0.4.2'
}
```

#### npm

This plugin can retrieve bibliographical data from the main npm registry. Note that the `author` property is limited to a single author, since the `maintainers` data only has usernames and there is no public API to retrieve the associated full name.

```js
Cite.async('https://www.npmjs.com/package/@citation-js/plugin-software-formats')

{
  type: 'book',
  title: '@citation-js/plugin-software-formats',
  version: '0.4.2',
  issued: { 'date-parts': [ [2020, 30, 21] ] },
  abstract: 'Collection of software-related input and output formats for Citation.js',
  URL: 'https://github.com/larsgw/citation.js-plugin-software-formats#readme',
  author: [ { given: 'Lars', family: 'Willighagen' } ]
}
```

### Output

#### CFF

This plugin supports CFF output, both in YAML and in JSON form. If you pass
multiple references the first counts as the main reference, while the rest
are added in the `references` list. To specify a different entry as the main
reference, pass the entry ID in the `main` options:

```js
Cite(/* ... */).format('cff', {
  main: '...'
})
```

Alternatively, the entry can have `_cff_mainReference` set to `true`, but that
is mainly used for round-tripping.
