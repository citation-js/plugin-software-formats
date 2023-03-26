This plugin can retrieve bibliographical data from packages in the main npm registry.

## Install

### npm

```js
npm install @citation-js/plugin-npm
```

### Browser

Make a build with `@citation-js/plugin-npm` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Register the plugin by `require`-ing it:

```js
require('@citation-js/plugin-npm')
```

The plugin can then be used as following:

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

> Note that the `author` field is limited to a single author, since the `maintainers` data only has usernames and there is no public API to retrieve the associated full name.
