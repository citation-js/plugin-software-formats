import type { CSL } from '@citation-js/core'

interface Identifier {
  description?: string
  type: 'doi'|'url'|'swh'|'other'
  value: string
}

type Type =
  | 'art'
  | 'article'
  | 'audiovisual'
  | 'bill'
  | 'blog'
  | 'book'
  | 'catalogue'
  | 'conference-paper'
  | 'conference'
  | 'data'
  | 'database'
  | 'dictionary'
  | 'edited-work'
  | 'encyclopedia'
  | 'film-broadcast'
  | 'generic'
  | 'government-document'
  | 'grant'
  | 'hearing'
  | 'historical-work'
  | 'legal-case'
  | 'legal-rule'
  | 'magazine-article'
  | 'manual'
  | 'map'
  | 'multimedia'
  | 'music'
  | 'newspaper-article'
  | 'pamphlet'
  | 'patent'
  | 'personal-communication'
  | 'proceedings'
  | 'report'
  | 'serial'
  | 'slides'
  | 'software-code'
  | 'software-container'
  | 'software-executable'
  | 'software-virtual-machine'
  | 'software'
  | 'sound-recording'
  | 'standard'
  | 'statute'
  | 'thesis'
  | 'unpublished'
  | 'video'
  | 'website'

interface Person {
  address?: string
  affiliation?: string
  alias?: string
  city?: string
  country?: string
  email?: string
  'family-names'?: string
  fax?: string
  'given-names'?: string
  'name-particle'?: string
  'name-suffix'?: string
  orcid?: string
  'post-code'?: string | number
  region?: string
  tel?: string
  website?: string
}

interface Entity {
  address?: string
  alias?: string
  city?: string
  country?: string
  'date-end'?: string
  'date-start'?: string
  email?: string
  fax?: string
  location?: string
  name: string
  orcid?: string
  'post-code'?: string | number
  region?: string
  tel?: string
  website?: string
}

type Authority = Person | Entity

interface BaseReference {
  abstract?: string
  authors: [Authority, ...Authority[]]
  commit?: string
  contact?: [Authority, ...Authority[]]
  'date-released'?: string
  doi?: string
  identifiers?: [Identifier, ...Identifier[]]
  keywords?: [string, ...string[]]
  license?: string
  'license-url'?: string
  repository?: string
  'repository-artifact'?: string
  'repository-code'?: string
  title: string
  url?: string
  version?: string | number
}

interface Reference extends BaseReference {
  abbreviation?: string
  'collection-doi'?: string
  'collection-title'?: string
  'collection-type'?: string
  conference?: Entity
  copyright?: string
  'data-type'?: string
  database?: string
  'database-provider'?: Entity
  'date-accessed'?: string
  'date-downloaded'?: string
  'date-published'?: string
  department?: string
  edition?: string
  editors?: [Authority, ...Authority[]]
  'editors-series'?: [Authority, ...Authority[]]
  end?: number | string
  entry?: string
  filename?: string
  format?: string
  institution?: Entity
  isbn?: string
  issn?: string
  issue?: string | number
  'issue-date'?: string
  'issue-title'?: string
  journal?: string
  languages?: [string, ...string[]]
  'loc-end'?: number | string
  'loc-start'?: number | string
  location?: Entity
  medium?: string
  month?: number | ('1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12')
  nihmsid?: string
  notes?: string
  number?: string | number
  'number-volumes'?: number | string
  pages?: number | string
  'patent-states'?: [string, ...string[]]
  pmcid?: string
  publisher?: Entity
  recipients?: [Entity | Person, ...(Entity | Person)[]]
  scope?: string
  section?: string | number
  senders?: [Entity | Person, ...(Entity | Person)[]]
  start?: number | string
  status?: 'abstract' | 'advance-online' | 'in-preparation' | 'in-press' | 'preprint' | 'submitted'
  term?: string
  'thesis-type'?: string
  translators?: [Entity | Person, ...(Entity | Person)[]]
  type: Type
  volume?: number | string
  'volume-title'?: string
  year?: number | string
  'year-original'?: number | string
}

interface CitationFileFormat extends BaseReference {
  'cff-version': string
  message: string
  type: 'dataset' | 'software'
  'preferred-citation'?: Reference
  references?: [Reference, ...Reference[]]
}

interface OutputOptions {
  main?: string
  preferred?: string
  cffVersion?: string
  message?: string
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@cff/object': (input: CitationFileFormat) => Array<CSL>
      }
    }

    namespace output {
      interface Formats {
        cff:
          | ((options?: { type?: 'text' } & OutputOptions) => string)
          | ((options: { type: 'object' } & OutputOptions) => CitationFileFormat)
      }
    }
  }
}
