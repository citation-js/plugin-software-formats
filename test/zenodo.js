export const inputTests = [
  {
    name: 'simple',
    input: `{
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
}
`,
    output: [{
      author: [{
        family: 'Willighagen',
        given: 'Lars Gerard',
        _orcid: '0000-0002-4751-4637',
        _affiliation: 'Radboud Universiteit, Nijmegen'
      }],
      title: 'Biodiversity Matcher',
      type: 'book',
      abstract: 'Match Wikimedia pictures taxonomic groups',
      keyword: 'Wikimedia,iNaturalist,Wikidata'
    }]
  }
]
