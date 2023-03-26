export const apiTests = [
  {
    name: 'simple',
    input: 'https://api.github.com/repos/larsgw/citation.js',
    output: [{
      URL: 'https://github.com/larsgw/citation.js',
      abstract: 'Citation.js converts formats like BibTeX, Wikidata JSON and ContentMine JSON to CSL-JSON to convert to other formats like APA, Vancouver and back to BibTeX.',
      author: [
        { family: 'Willighagen', given: 'Lars' },
        { family: 'Willighagen', given: 'Egon' },
        { family: 'Wienke', given: 'Johannes' },
        { family: 'Čermák', given: 'Petr' },
        { family: 'Badger', given: 'The Gitter' }
      ],
      issued: { 'date-parts': [[2021, 5, 11]] },
      title: 'larsgw/citation.js',
      'title-short': 'citation.js',
      type: 'software',
      version: 'v0.5.1',
      custom: {
        versions: [
          { version: 'v0.5.1' },
          { version: 'v0.5.0' },
          { version: 'v0.5.0-alpha.10' },
          { version: 'v0.5.0-alpha.9' },
          { version: 'v0.5.0-alpha.8' },
          { version: 'v0.5.0-alpha.7' },
          { version: 'v0.5.0-alpha.6' },
          { version: 'v0.5.0-alpha.5' },
          { version: 'v0.5.0-alpha.4' },
          { version: 'v0.5.0-alpha.3' },
          { version: 'v0.5.0-alpha.2' },
          { version: 'v0.5.0-alpha.0' },
          { version: 'v0.4.10' },
          { version: 'v0.4.9' },
          { version: 'v0.4.8' },
          { version: 'v0.4.7' },
          { version: 'v0.4.6' },
          { version: 'v0.4.5' },
          { version: 'v0.4.4' },
          { version: 'v0.4.2' },
          { version: 'v0.4.1' },
          { version: 'v0.4.0' },
          { version: 'v0.4.0-12' },
          { version: 'v0.4.0-11' },
          { version: 'v0.4.0-10' },
          { version: 'v0.4.0-9' },
          { version: 'v0.4.0-8' },
          { version: 'v0.4.0-7' },
          { version: 'v0.4.0-6' },
          { version: 'v0.4.0-5' }
        ]
      }
    }]
  }
]

export const urlTests = [
  {
    name: 'simple',
    input: 'https://github.com/larsgw/citation.js',
    output: apiTests[0].output
  }
]
