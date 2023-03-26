This plugin can retrieve bibliographical data from the GitHub API.

> The GitHub API has rate limits. For unauthorized requests this is 60 requests per hour. As the API is limited, retrieving the bibliographical data for a single repository can take ~10 API requests. With authorized requests, you can make up to 5000 requests per hour. To let Citation.js make authorized requests, you can set an OAuth token. To get an OAuth token from your GitHub account, see [this guide](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You do not need to select any additional scopes. Citation.js won't do anything else with this OAuth token.

## Install

### npm

```js
npm install @citation-js/plugin-github
```

### Browser

Make a build with `@citation-js/plugin-github` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Register the plugin by `require`-ing it:

```js
require('@citation-js/plugin-github')
```

The plugin can then be used as following:

```js
const { Cite, plugins } = require('@citation-js/core')

plugins.config.get('@github').setApiToken(OAUTH_TOKEN)

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
