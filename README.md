## Install

### npm

```js
npm install @citation-js/plugin-software-formats
```

### Browser

Make a build with `@citation-js/plugin-software-formats` on the [build tool](https://juniper-coat.glitch.me).

## Use

Install the plugin by `require`-ing it:

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

Example from [here](https://github.com/citation-file-format/citation-file-format#example)

#### GitHub

This plugin can retrieve bibliographical data from the GitHub API. Note, however, that said API practices rate-limiting, namely 60 unauthorized requests per hours. Also, because the API is limited, a single source can take ~10 API requests. With authorized requests, you can make up to 5000 requests per hour. To let Citation.js make authorized requests, you can set an OAuth token. To get an OAuth token from your GitHub account, see [this guide](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You don't need to select any additional scopes. Citation.js won't do anything else with this OAuth token.

```js
Cite.plugins.config.get('@github').apiToken = OAUTH_TOKEN

Cite('https://github.com/citation-js/plugin-software-formats')
```

#### npm

This plugin can retrieve bibliographical data from the main npm registry. Note that the `author` property is limited to a single author, since the `maintainers` data only has usernames and there is no public API to retrieve the associated full name.

```js
Cite('https://www.npmjs.com/package/@citation-js/plugin-software-formats')

{
  URL: 'https://citation.js.org/',
  abstract: 'Citation.js converts formats like BibTeX, Wikidata JSON and ContentMine JSON to CSL-JSON to convert to other formats like APA, Vancouver and back to BibTeX.',
  author: [
    {family: 'Willighagen', given: 'Lars'}
  ],
  issued: {'date-parts': [[2018, 12, 27]]},
  title: 'citation-js',
  version: '0.4.0-11',
  type: 'book'
}
```

### Output

#### CFF

This plugin supports CFF output, both in YAML and in JSON form.
