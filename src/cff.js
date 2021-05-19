import { util } from '@citation-js/core'
import { parse as parseDate } from '@citation-js/date'

/**
 * Format: Citation File Format (CFF) version 1.1.0
 * Spec: https://github.com/citation-file-format/citation-file-format/blob/1.1.0/README.md#specification
 */

const TYPES_TO_TARGET = {
  art: 'graphic',
  article: 'article-journal', // way more likely
  audiovisual: 'motion_picture',
  bill: 'bill',
  blog: 'post-weblog',
  book: 'book',
  catalogue: 'entry', // 1
  conference: 'paper-conference', // 1
  'conference-paper': 'paper-conference',
  data: 'dataset',
  database: 'dataset', // 1
  dictionary: 'entry-dictionary', // 1
  'edited-work': 'book', // 5
  encyclopedia: 'entry-encyclopedia', // 1
  'film-broadcast': 'broadcast', // or motion_picture
  generic: 'book',
  'government-document': 'bill', // 3
  grant: 'bill', // 3
  hearing: 'interview', // not sure if this belongs, but I did the same for RIS <-> CSL
  'historical-work': 'manuscript', // 5
  'legal-case': 'legal_case',
  'legal-rule': 'legislation',
  'magazine-article': 'article-magazine',
  manual: 'article', // 4
  map: 'map',
  multimedia: 'motion_picture', // 1
  music: 'musical_score',
  'newspaper-article': 'article-newspaper',
  pamphlet: 'pamphlet',
  patent: 'patent',
  'personal-communication': 'personal_communication',
  proceedings: 'paper-conference', // 3
  report: 'report',
  serial: 'post', // 3
  slides: 'speech', // 'presentation' is 'speech' in Zotero <-> CSL
  software: 'book', // 2
  'software-code': 'book', // 2
  'software-container': 'book', // 2
  'software-executable': 'book', // 2
  'software-virtual-machine': 'book', // 2
  'sound-recording': 'song', // 1
  standard: 'article', // 4
  statute: 'legislation', // 1
  thesis: 'thesis',
  unpublished: 'article', // 4
  video: 'motion_picture', // 1
  website: 'webpage'
}

// 1 closest mapping
// 2 generally accepted substitue. see
//   https://aurimasv.github.io/z2csl/typeMap.xml#map-computerProgram
// 3 no idea, but seems alright
// 4 seems a somewhat more appropiate default than 'book'
// 5 it says so in the notes in
//   https://citation-file-format.github.io/1.0.3/specifications/#reference-types

const TYPES_TO_SOURCE = {
  article: 'article',
  'article-journal': 'article',
  'article-magazine': 'magazine-article',
  'article-newspaper': 'newspaper-article',
  bill: 'bill',
  book: 'book',
  broadcast: 'film-broadcast',
  chapter: 'serial',
  dataset: 'data',
  entry: 'catalogue',
  'entry-dictionary': 'dictionary',
  'entry-encyclopedia': 'encyclopedia',
  figure: 'art',
  graphic: 'art',
  interview: 'sound-recording',
  legal_case: 'legal-case',
  legislation: 'legal-rule',
  manuscript: 'historical-work',
  map: 'map',
  motion_picture: 'film-broadcast',
  musical_score: 'music',
  pamphlet: 'pamphlet',
  'paper-conference': 'conference-paper',
  patent: 'patent',
  personal_communication: 'personal-communication',
  post: 'serial',
  'post-weblog': 'blog',
  report: 'report',
  review: 'article',
  'review-book': 'book',
  song: 'sound-recording',
  speech: 'sound-recording',
  thesis: 'thesis',
  treaty: 'generic',
  webpage: 'website'
}

const ENTITY_PROPS = [
  { source: 'family-names', target: 'family' },
  { source: 'given-names', target: 'given' },
  { source: 'name-particle', target: 'non-dropping-particle' },
  { source: 'name-suffix', target: 'suffix' },
  { source: 'name', target: 'literal' },
  { source: 'orcid', target: '_orcid' }
]

const entity = new util.Translator(ENTITY_PROPS)

const PROP_CONVERTERS = {
  names: {
    toTarget (names) {
      return names.map(entity.convertToTarget)
    },
    toSource (names) {
      return names.map(entity.convertToSource)
    }
  },
  publisher: {
    toTarget ({ name, city, region, country }) {
      const place = [city, region, country].filter(Boolean).join(', ')
      return [name, place || undefined]
    },
    toSource (name, place) {
      const entity = { name }

      if (place) {
        // Parse the following:
        //   - Country
        //   - City, Country
        //   - City, Region, Country
        const parts = place.split(', ')
        entity.country = parts.pop()
        if (parts.length === 2) { entity.region = parts.pop() }
        if (parts.length === 1) { entity.city = parts.pop() }
      }

      return entity
    }
  },
  date: {
    toTarget (date) {
      return parseDate(date.toISOString())
    },
    toSource (date) {
      if (date.raw) {
        return date.raw
      }
      const [year, month, day] = date['date-parts'][0]
      if (day) {
        return new Date(Date.UTC(year, month - 1, day))
      } else if (month) {
        return new Date(Date.UTC(year, month - 1))
      } else {
        return new Date(Date.UTC(year))
      }
    }
  }
}

const MAIN_PROPS = [
  'abstract',

  { source: 'authors', target: 'author', convert: PROP_CONVERTERS.names },

  // TODO cff: commit

  // TODO cff: contact

  {
    source: 'date-released',
    target: 'issued',
    when: { target: { type: 'book', version: true } },
    convert: PROP_CONVERTERS.date
  },

  { source: 'doi', target: 'DOI' },

  {
    source: 'identifiers',
    target: ['DOI', 'ISBN', 'ISSN', 'PMCID', 'PMID', 'URL'],
    convert: {
      toTarget (identifiers) {
        const newIdentifiers = Array(6).fill(undefined)
        for (const { type, value } of identifiers) {
          if (!this.doi && type === 'doi') { newIdentifiers[0] = value }
          if (!this.url && type === 'url') { newIdentifiers[5] = value }
          if (type === 'other' && value.startsWith('urn:isbn:')) {
            newIdentifiers[1] = value.slice(9)
          }
          if (type === 'other' && value.startsWith('urn:issn:')) {
            newIdentifiers[2] = value.slice(9)
          }
          if (type === 'other' && value.startsWith('pmcid:')) {
            newIdentifiers[3] = value.slice(6)
          }
          if (type === 'other' && value.startsWith('pmid:')) {
            newIdentifiers[4] = value.slice(5)
          }
        }
        return newIdentifiers
      },
      toSource (doi, isbn, issn, pmcid, pmid, url) {
        return [
          doi && { type: 'doi', value: doi },
          url && { type: 'url', value: url },

          isbn && { type: 'other', value: `urn:isbn:${isbn}` },
          issn && { type: 'other', value: `urn:issn:${issn}` },
          pmcid && { type: 'other', value: `pmcid:${pmcid}` },
          pmid && { type: 'other', value: `pmid:${pmid}` }
        ].filter(Boolean)
      }
    }
  },

  {
    source: 'keywords',
    target: 'keyword',
    convert: {
      toTarget (keywords) { return keywords.join(',') },
      toSource (keywords) { return keywords.split(/,\s*/g) }
    }
  },

  // TODO cff: license
  // TODO cff: license-url

  // TODO cff: message *

  // TODO cff: repository
  // TODO cff: repository-code
  // TODO cff: repository-artifact

  {
    source: 'title',
    target: 'title',
    when: {
      source: { term: false, entry: false },
      target: {
        // Everything except entry-*
        type: [
          'article',
          'article-journal',
          'article-magazine',
          'article-newspaper',
          'bill',
          'book',
          'broadcast',
          'chapter',
          'dataset',
          'figure',
          'graphic',
          'interview',
          'legal_case',
          'legislation',
          'manuscript',
          'map',
          'motion_picture',
          'musical_score',
          'pamphlet',
          'paper-conference',
          'patent',
          'personal_communication',
          'post',
          'post-weblog',
          'report',
          'review',
          'review-book',
          'song',
          'speech',
          'thesis',
          'treaty',
          'webpage'
        ]
      }
    }
  },

  {
    source: 'title',
    target: 'container-title',
    when: {
      source: { entry: true, journal: false },
      target: { type: ['entry'] }
    }
  },

  {
    source: 'title',
    target: 'container-title',
    when: {
      source: { term: true, journal: false },
      target: { type: ['entry-dictionary', 'entry-encyclopedia'] }
    }
  },

  { source: 'url', target: 'URL' },

  'version'
]

const REF_PROPS = [
  // Include main mappings
  ...MAIN_PROPS,

  // ABBREVIATION
  { source: 'abbreviation', target: 'title-short' },
  { source: 'abbreviation', target: 'shortTitle' },

  // COLLECTIONS
  // TODO cff: collection-doi
  // TODO cff: collection-type
  'collection-title',

  // COMMUNICATION
  { source: 'recipients', target: 'recipient', convert: PROP_CONVERTERS.names },
  { source: 'senders', target: 'authors', convert: PROP_CONVERTERS.names },

  // CONFERENCE
  {
    source: 'conference',
    target: ['event', 'event-date', 'event-place'],
    convert: {
      toTarget (event) {
        return [
          event.name,
          parseDate(
            event['date-start'].toISOString(),
            event['date-end'].toISOString()
          ),
          event.location
        ]
      }
    }
  },

  // COPYRIGHT
  // TODO cff: contact
  // TODO cff: copyright

  // DATABASE
  { source: 'database', target: 'source' },
  // TODO cff: database-provider NOTE entity

  // DATE
  { source: 'date-accessed', target: 'accessed', convert: PROP_CONVERTERS.date },

  {
    source: 'date-downloaded',
    target: 'accessed',
    convert: PROP_CONVERTERS.date,
    when: { source: { 'date-accessed': false }, target: false }
  },

  {
    source: 'date-published',
    target: 'issued',
    convert: PROP_CONVERTERS.date,
    when: {
      source: { 'date-released': false },
      target () { return this.type !== 'book' || !this.version }
    }
  },

  {
    source: ['year', 'month'],
    target: 'issued',
    when: { source: { 'date-published': false, 'date-released': false, year: true } },
    convert: {
      toTarget (year, month) {
        const date = month ? [year, month] : [year]
        return { 'date-parts': [date] }
      },
      toSource (issued) {
        const [year, month] = issued['date-parts'][0]
        return [year, month]
      }
    }
  },

  {
    source: 'year-original',
    target: 'original-date',
    convert: {
      toTarget (year) { return { 'date-parts': [[year]] } },
      toSource (date) { return date['date-parts'][0][0] }
    }
  },

  // EDITION
  'edition',

  // EDITORS
  { source: 'editors', target: 'editor', convert: PROP_CONVERTERS.names },
  { source: 'editors-series', target: 'collection-editor', convert: PROP_CONVERTERS.names },

  // ENTRY
  {
    source: 'entry',
    target: 'title',
    when: {
      source: { term: false },
      target: { type: 'entry' }
    }
  },
  {
    source: 'term',
    target: 'title',
    when: {
      target: { type: ['entry-dictionary', 'entry-encyclopedia'] }
    }
  },

  // FORMAT
  { source: 'format', target: 'dimensions' },
  'medium',

  // GENRE
  { source: 'data-type', target: 'genre' },
  {
    source: 'thesis-type',
    target: 'genre',
    when: {
      source: { 'data-type': false },
      target: { type: 'thesis' }
    }
  },

  // IDENTIFIERS
  { source: 'isbn', target: 'ISBN' },
  { source: 'issn', target: 'ISSN' },
  // TODO cff: nihmsid
  { source: 'pmcid', target: 'PMCID' },

  // ISSUE
  'issue',

  // JOURNAL
  { source: 'journal', target: 'container-title' },
  // TODO cff: volume-title
  // TODO cff: issue-title
  // TODO cff: issue-date

  // LANGUAGE
  {
    source: 'languages',
    target: 'language',
    when: {
      target: true,
      // NOTE: possible values not as strict in csl, so test (crudely) if the value is ok first
      source: { language (code) { return /[a-z]{2,3}/.test(code) } }
    },
    convert: {
      // NOTE: CSL can only hold one language
      toSource (language) { return [language] },
      toTarget (languages) { return languages[0] }
    }
  },

  // LOCATION
  {
    source: 'location',
    target: ['archive', 'archive-place'],
    convert: PROP_CONVERTERS.publisher
  },

  // LOCATION (CODE)
  // TODO cff: filename
  // TODO cff: loc-start
  // TODO cff: loc-end

  // NOTES
  { source: 'notes', target: 'note', when: { source: { scope: false } } },
  { source: 'scope', target: 'note', when: { target: false } },

  // NUMBER
  'number',

  // PATENT
  {
    source: 'patent-states',
    target: 'jurisdiction',
    // NOTE: CSL jurisdiction can contain more than just US states
    when: { target: false },
    convert: { toTarget (states) { return states.join(', ') } }
  },

  // PUBLISHER
  {
    source: ['institution', 'department'],
    target: ['publisher', 'publisher-place'],
    when: { source: { publisher: false }, target: { type: 'thesis' } },
    convert: {
      toTarget (institution, department) {
        const [name, place] = PROP_CONVERTERS.publisher.toTarget(institution)
        return [department ? `${department}, ${name}` : name, place]
      },
      toSource (name, place) {
        return [
          PROP_CONVERTERS.publisher.toSource(name, place)
        ]
      }
    }
  },
  {
    source: 'publisher',
    target: ['publisher', 'publisher-place'],
    convert: PROP_CONVERTERS.publisher
  },

  // SECTION
  'section',

  // STATUS
  {
    source: 'status',
    target: 'status',
    when: {
      source: true,
      // NOTE: possible values not as strict in csl, so test if the value is ok first
      target: { status: ['in-preparation', 'abstract', 'submitted', 'in-press', 'advance-online', 'preprint'] }
    }
  },

  // PAGES
  { source: 'start', target: 'page-first' },
  {
    source: ['start', 'end'],
    target: 'page',
    convert: {
      toTarget (start, end) {
        return `${start}-${end}`
      },
      toSource (page) {
        const [start, end] = page.split('-')
        return [start, end]
      }
    }
  },
  { source: 'pages', target: 'number-of-pages' },

  // TRANSLATORS
  { source: 'translators', target: 'translator', convert: PROP_CONVERTERS.names },

  // TYPES
  {
    source: 'type',
    target: 'type',
    convert: {
      toSource (type) { return TYPES_TO_SOURCE[type] || 'generic' },
      toTarget (type) {
        const output = TYPES_TO_TARGET[type] || 'book'
        return output === 'book' && this.version ? 'software' : output
      }
    }
  },

  // VOLUMES
  'volume',
  { source: 'number-volumes', target: 'number-of-volumes' }
]

const mainTranslator = new util.Translator(MAIN_PROPS)
const refTranslator = new util.Translator(REF_PROPS)

export function parse (input) {
  const output = mainTranslator.convertToTarget(input)
  const refs = (input.references || []).map(refTranslator.convertToTarget)

  output.type = TYPES_TO_TARGET.software
  output._cff_mainReference = true

  return [output, ...refs]
}

export function format (input, { main, message } = {}) {
  let mainIndex = input.findIndex(entry => main ? entry.id === main : entry._cff_mainReference)
  mainIndex = mainIndex > 0 ? mainIndex : 0

  const mainRef = mainTranslator.convertToSource(input.splice(mainIndex, 1)[0] || {})
  const references = input.map(refTranslator.convertToSource)

  return {
    'cff-version': CFF_VERSION,
    message: message || 'Please cite the following works when using this software.',
    ...mainRef,
    references
  }
}

export const CFF_VERSION = '1.1.0'
