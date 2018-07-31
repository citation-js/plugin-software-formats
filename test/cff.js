export const inputTests = [
  {
    name: 'simple',
    input: `cff-version: 1.0.3
message: If you use this software, please cite it as below.
authors:
  - family-names: Druskat
    given-names: Stephan
    orcid: https://orcid.org/0000-0003-4925-7248
title: My Research Tool
version: 1.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18`,
    output: [{
      _cff_mainReference: true,
      author: [{family: 'Druskat', given: 'Stephan'}],
      title: 'My Research Tool',
      DOI: '10.5281/zenodo.1234',
      issued: {'date-parts': [[2017, 12, 18]]},
      type: 'book',
      version: '1.0.4'
    }]
  }
]

export const outputTests = [
  {
    name: 'simple',
    input: [{
      type: 'book',
      author: [{family: 'Druskat', given: 'Stephan'}],
      title: 'My Research Tool',
      DOI: '10.5281/zenodo.1234',
      issued: {'date-parts': [[2017, 12, 18]]},
      version: '1.0.4'
    }],
    output: `cff-version: 1.0.3
authors:
  -
    family-names: Druskat
    given-names: Stephan
date-released: 2017-12-18T00:00:00.000Z
doi: 10.5281/zenodo.1234
title: 'My Research Tool'
version: 1.0.4
references: []
`
  }
]
