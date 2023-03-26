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
      issued: { 'date-parts': [[2021, 5, 11]] },
      title: 'citation-js',
      version: '0.5.1',
      type: 'software',
      custom: {
        versions: [
          { version: '0.2.0', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.1', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.2', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.3', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.4', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.5', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.6', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.7', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.8', issued: { 'date-parts': [[2016, 10, 27]] } },
          { version: '0.2.10', issued: { 'date-parts': [[2016, 11, 20]] } },
          { version: '0.2.11', issued: { 'date-parts': [[2016, 12, 28]] } },
          { version: '0.2.12', issued: { 'date-parts': [[2016, 12, 31]] } },
          { version: '0.2.13', issued: { 'date-parts': [[2016, 12, 31]] } },
          { version: '0.2.14', issued: { 'date-parts': [[2017, 1, 3]] } },
          { version: '0.2.15', issued: { 'date-parts': [[2017, 1, 31]] } },
          { version: '0.3.0-0', issued: { 'date-parts': [[2017, 3, 13]] } },
          { version: '0.3.0-1', issued: { 'date-parts': [[2017, 3, 14]] } },
          { version: '0.3.0-2', issued: { 'date-parts': [[2017, 3, 14]] } },
          { version: '0.3.0-3', issued: { 'date-parts': [[2017, 4, 8]] } },
          { version: '0.3.0-4', issued: { 'date-parts': [[2017, 4, 30]] } },
          { version: '0.3.0-5', issued: { 'date-parts': [[2017, 5, 8]] } },
          { version: '0.3.0-6', issued: { 'date-parts': [[2017, 5, 15]] } },
          { version: '0.3.0-7', issued: { 'date-parts': [[2017, 5, 22]] } },
          { version: '0.3.0-8', issued: { 'date-parts': [[2017, 6, 3]] } },
          { version: '0.3.0-9', issued: { 'date-parts': [[2017, 7, 6]] } },
          { version: '0.3.0-10', issued: { 'date-parts': [[2017, 7, 22]] } },
          { version: '0.3.0-11', issued: { 'date-parts': [[2017, 7, 28]] } },
          { version: '0.3.0-12', issued: { 'date-parts': [[2017, 8, 1]] } },
          { version: '0.3.0-13', issued: { 'date-parts': [[2017, 8, 22]] } },
          { version: '0.3.0-14', issued: { 'date-parts': [[2017, 8, 24]] } },
          { version: '0.3.0', issued: { 'date-parts': [[2017, 8, 25]] } },
          { version: '0.3.1', issued: { 'date-parts': [[2017, 9, 3]] } },
          { version: '0.3.2', issued: { 'date-parts': [[2017, 9, 10]] } },
          { version: '0.3.3', issued: { 'date-parts': [[2017, 9, 12]] } },
          { version: '0.3.4', issued: { 'date-parts': [[2017, 9, 12]] } },
          { version: '0.4.0-0', issued: { 'date-parts': [[2017, 12, 22]] } },
          { version: '0.4.0-1', issued: { 'date-parts': [[2017, 12, 31]] } },
          { version: '0.4.0-3', issued: { 'date-parts': [[2018, 5, 11]] } },
          { version: '0.4.0-4', issued: { 'date-parts': [[2018, 5, 18]] } },
          { version: '0.4.0-5', issued: { 'date-parts': [[2018, 6, 3]] } },
          { version: '0.4.0-6', issued: { 'date-parts': [[2018, 6, 30]] } },
          { version: '0.4.0-7', issued: { 'date-parts': [[2018, 7, 11]] } },
          { version: '0.4.0-8', issued: { 'date-parts': [[2018, 7, 14]] } },
          { version: '0.4.0-9', issued: { 'date-parts': [[2018, 7, 19]] } },
          { version: '0.4.0-10', issued: { 'date-parts': [[2018, 11, 2]] } },
          { version: '0.4.0-11', issued: { 'date-parts': [[2018, 12, 27]] } },
          { version: '0.4.0-12', issued: { 'date-parts': [[2019, 3, 17]] } },
          { version: '0.4.0', issued: { 'date-parts': [[2019, 4, 13]] } },
          { version: '0.4.1', issued: { 'date-parts': [[2019, 6, 13]] } },
          { version: '0.4.2', issued: { 'date-parts': [[2019, 6, 13]] } },
          { version: '0.4.4', issued: { 'date-parts': [[2019, 6, 13]] } },
          { version: '0.4.5', issued: { 'date-parts': [[2019, 6, 13]] } },
          { version: '0.4.6', issued: { 'date-parts': [[2019, 6, 29]] } },
          { version: '0.4.7', issued: { 'date-parts': [[2019, 6, 29]] } },
          { version: '0.4.8', issued: { 'date-parts': [[2019, 7, 6]] } },
          { version: '0.4.9', issued: { 'date-parts': [[2019, 8, 27]] } },
          { version: '0.4.10', issued: { 'date-parts': [[2019, 8, 27]] } },
          { version: '0.5.0-alpha.0', issued: { 'date-parts': [[2019, 9, 7]] } },
          { version: '0.5.0-alpha.2', issued: { 'date-parts': [[2019, 9, 10]] } },
          { version: '0.5.0-alpha.3', issued: { 'date-parts': [[2019, 10, 8]] } },
          { version: '0.5.0-alpha.4', issued: { 'date-parts': [[2019, 10, 15]] } },
          { version: '0.5.0-alpha.5', issued: { 'date-parts': [[2020, 3, 8]] } },
          { version: '0.5.0-alpha.6', issued: { 'date-parts': [[2020, 7, 5]] } },
          { version: '0.5.0-alpha.7', issued: { 'date-parts': [[2020, 8, 29]] } },
          { version: '0.5.0-alpha.8', issued: { 'date-parts': [[2020, 10, 20]] } },
          { version: '0.5.0-alpha.9', issued: { 'date-parts': [[2020, 10, 20]] } },
          { version: '0.5.0-alpha.10', issued: { 'date-parts': [[2021, 1, 28]] } },
          { version: '0.5.0', issued: { 'date-parts': [[2021, 4, 1]] } },
          { version: '0.5.1', issued: { 'date-parts': [[2021, 5, 11]] } }
        ]
      }
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
