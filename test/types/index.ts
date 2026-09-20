import { Cite, plugins } from '@citation-js/core'
import type { CSL } from '@citation-js/core'
import '@citation-js/plugin-software-formats'

const a = plugins.input.data({
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
}, '@zenodo/metadata+object')

type Expect<T extends true> = T
type IsCsl<T> = T extends CSL ? true : false

// @ts-ignore
type Tests = [
  Expect<IsCsl<typeof a>>,
]
