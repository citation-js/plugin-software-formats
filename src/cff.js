import { Translator } from './translator'

// FIXME import properly
import parseDate from 'citation-js/lib/parse/date'

/**
 * Format: Citation File Format (CFF) version 1.0.3
 * Supported: CFF-CORE
 * Page: https://citation-file-format.github.io/citation-file-format
 * Spec: https://citation-file-format.github.io/assets/pdf/cff-specifications-1.0.3.pdf
 */

const TYPES_TO_TARGET = {
  art: 'graphic',
  article: 'article',
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
  hearing: 'interview', // 6
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
  slides: 'speech', // 7
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
// 6 not sure if this belongs, but I did the same for RIS <-> CSL
// 7 'presentation' is 'speech' in Zotero <-> CSL

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
  { source: 'name', target: 'literal' }
]

const entity = new Translator(ENTITY_PROPS)

const PROP_CONVERTERS = {
  names: {
    toTarget (names) {
      return names.map(entity.convertToTarget)
    },
    toSource (names) {
      return names.map(entity.convertToSource)
    }
  },
  name: {
    toTarget ({ name }) { return name },
    toSource (name) { return { name } }
  },
  date: {
    toTarget (date) {
      return parseDate(date.toISOString())
    },
    toSource (date) {
      if (date.raw) {
        return date.raw
      }
      let [year, month, day] = date['date-parts'][0]
      return new Date(Date.UTC(year, month - 1, day))
    }
  }
}

const MAIN_PROPS = [
  'abstract',

  { source: 'authors', target: 'author', convert: PROP_CONVERTERS.names },

  // TODO cff: commit

  // TODO cff: contact

  { source: 'date-released', target: 'issued', convert: PROP_CONVERTERS.date },

  { source: 'doi', target: 'DOI' },

  'keywords',

  // TODO cff: license
  // TODO cff: license-url

  // TODO cff: message *

  // TODO cff: repository
  // TODO cff: repository-code
  // TODO cff: repository-artifact

  'title',

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
  // TODO csl: container-title
  'collection-title',
  // TODO cff: collection-type
  // TODO cff: volume-title
  // TODO cff: issue-title

  // COMMUNICATION
  { source: 'recipients', target: 'recipient', convert: PROP_CONVERTERS.names },
  // TODO cff: senders NOTE name/entity list

  // CONFERENCE
  { source: 'conference', target: 'event', convert: PROP_CONVERTERS.name },

  // COPYRIGHT
  // TODO cff: copyright

  // DATABASE
  // TODO cff: data-type
  // TODO cff: database
  // TODO cff: database-provider NOTE entity

  // DATE
  { source: 'date-accessed', target: 'accessed', convert: PROP_CONVERTERS.date },

  { source: 'date-downloaded',
    target: 'accessed',
    convert: PROP_CONVERTERS.date,
    when: { source: { 'date-accessed': false }, target: false } },

  { source: 'date-published',
    target: 'issued',
    convert: PROP_CONVERTERS.date,
    when: { source: { 'date-released': false }, target: false } },

  {
    source: ['year', 'month'],
    target: 'issued',
    when: { source: { 'date-published': false, 'date-released': false, year: true } },
    convert: {
      toTarget (year, month) {
        let date = month ? [year, month] : [year]
        return { 'date-parts': [date] }
      },
      toSource (issued) {
        let [year, month] = issued['date-parts'][0]
        return [year, month]
      }
    }
  },

  { source: 'year-original',
    target: 'original-date',
    convert: {
      toTarget (year) { return { 'date-parts': [[year]] } },
      toSource (date) { return date['date-parts'][0][0] }
    } },

  // DEPARTMENT
  // TODO cff: department

  // EDITION
  'edition',

  // EDITORS
  { source: 'editors', target: 'editor', convert: PROP_CONVERTERS.names },
  { source: 'editors-series', target: 'collection-editor', convert: PROP_CONVERTERS.names },

  // ENTRY
  // TODO cff: entry

  // FORMAT
  // TODO cff: format
  'medium',

  // IDENTIFIERS
  { source: 'isbn', target: 'ISBN' },
  { source: 'issn', target: 'ISSN' },
  // TODO cff: nihmsid
  { source: 'pmcid', target: 'PMCID' },

  // INSTITUTION
  // TODO cff: institution NOTE entity

  // ISSUE
  'issue', // TODO unsure, target may be 'number' instead
  // TODO cff: issue-date

  // JOURNAL
  // TODO cff: journal

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
  // TODO cff: location NOTE entity

  // LOCATION (CODE)
  // TODO cff: filename
  // TODO cff: loc-start
  // TODO cff: loc-end

  // NOTES
  { source: 'notes', target: 'note' },
  // TODO cff: scope *

  // NUMBER
  'number', // TODO unsure, target may be 'call-number' instead

  // PATENT
  // TODO cff: patent-states

  // PUBLISHER
  { source: 'publisher', target: 'publisher', convert: PROP_CONVERTERS.name },

  // SECTION
  'section',

  // STATUS
  { source: 'status',
    target: 'status',
    when: {
      source: true,
      // NOTE: possible values not as strict in csl, so test if the value is ok first
      target: { status: ['in-preparation', 'abstract', 'submitted', 'in-press', 'advance-online', 'preprint'] }
    } },

  // PAGES
  { source: 'start', target: 'page-first' },
  { source: ['start', 'end'],
    target: 'page',
    convert: {
      toTarget (start, end) {
        return `${start}-${end}`
      },
      toSource (page) {
        let [start, end] = page.split('-')
        return [start, end]
      }
    } },
  { source: 'pages', target: 'number-of-pages' },

  // TRANSLATORS
  { source: 'translators', target: 'translator', convert: PROP_CONVERTERS.names },

  // TYPES
  // TODO cff: thesis-type
  { source: 'type',
    target: 'type',
    convert: {
      toSource (type) { return TYPES_TO_SOURCE[type] || 'generic' },
      toTarget (type) { return TYPES_TO_TARGET[type] || 'book' }
    } },

  // VOLUMES
  'volume',
  'number-of-volumes'
]

const mainTranslator = new Translator(MAIN_PROPS)
const refTranslator = new Translator(REF_PROPS)

export function parse (input) {
  let output = mainTranslator.convertToTarget(input)
  let refs = (input.references || []).map(refTranslator.convertToTarget)

  output.type = TYPES_TO_TARGET.software
  output._cff_mainReference = true

  return [output, ...refs]
}

export function format (input, { main } = {}) {
  // Bugged in 0.4.0-4, due to the CSL normaliser erroneously removing props
  // starting with '_', because it checks if the value starts with '_' instead.
  let mainIndex = input.findIndex(entry => main ? entry.id === main : entry._cff_mainReference)
  mainIndex = mainIndex > 0 ? mainIndex : 0

  let mainRef = mainTranslator.convertToSource(input.splice(mainIndex, 1)[0] || {})
  let references = input.map(refTranslator.convertToSource)

  return { 'cff-version': CFF_VERSION, ...mainRef, references }
}

export const CFF_VERSION = '1.0.3'
