export const apiTests = [
  {
    name: 'simple',
    input: 'https://registry.npmjs.org/citation-js',
    output: [{
      URL: 'https://citation.js.org/',
      abstract: 'Citation.js converts formats like BibTeX, Wikidata JSON and ContentMine JSON to CSL-JSON to convert to other formats like APA, Vancouver and back to BibTeX.',
      author: [
        { family: 'Willighagen', given: 'Lars' }
      ],
      issued: { 'date-parts': [[2019, 10, 8]] },
      title: 'citation-js',
      version: '0.5.0-alpha.3',
      type: 'book'
    }]
  }
]

export const urlTests = [
  {
    name: 'simple',
    input: 'https://www.npmjs.com/package/citation-js',
    output: apiTests[0].output
  }
]
