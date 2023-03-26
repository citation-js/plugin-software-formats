This plugin can convert files in the [Zenodo Legacy Deposit](https://developers.zenodo.org/#depositions)
file format.

## Install

### npm

```js
npm install @citation-js/plugin-zenodo
```

### Browser

Make a build with `@citation-js/plugin-zenodo` on the [build tool](https://juniper-coat.glitch.me)!

## Use

Register the plugin by `require`-ing it:

```js
require('@citation-js/plugin-zenodo')
```

The plugin can then be used as following:

```js
Cite(`{
    "creators": [
        {
            "affiliation": "Radboud Universiteit, Nijmegen",
            "name": "Willighagen, Lars Gerard",
            "orcid": "0000-0002-4751-4637"
        }
    ],
    "description": "Match Wikimedia pictures taxonomic groups",
    "keywords": [
        "Wikimedia",
        "iNaturalist",
        "Wikidata"
    ],
    "license": "MIT",
    "title": "Biodiversity Matcher",
    "upload_type": "software"
}`)

{
  author: [
    {
      family: 'Willighagen',
      given: 'Lars Gerard',
      _orcid: '0000-0002-4751-4637',
      _affiliation: 'Radboud Universiteit, Nijmegen'
    }
  ],
  title: 'Biodiversity Matcher',
  type: 'software',
  abstract: 'Match Wikimedia pictures taxonomic groups',
  keyword: 'Wikimedia,iNaturalist,Wikidata'
}
```
