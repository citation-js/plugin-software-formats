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
      issued: { 'date-parts': [[2020, 10, 20]] },
      title: 'larsgw/citation.js',
      'title-short': 'citation.js',
      type: 'book'
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
