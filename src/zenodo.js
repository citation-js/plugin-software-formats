import { util } from '@citation-js/core'
import { parse as parseName, format as formatName } from '@citation-js/name'
import { parse as parseDate, format as formatDate } from '@citation-js/date'

/**
 * Format: Zenodo Legacy Deposit Schema v1.0.0
 * Spec: https://developers.zenodo.org/#depositions
 * Schema: https://zenodo.org/schemas/deposits/records/legacyrecord.json
 */

const TYPES_TO_TARGET = {
  poster: 'speech',
  presentation: 'speech',
  dataset: 'dataset',
  video: 'motion_picture',
  software: 'software',
  // * lesson: Lesson
  // * physicalobject: Physical object
  other: 'document'

  // Special case: see subtypes
  // * publication: Publication
  // * image: Image
}

const PUBLICATION_TYPES_TO_TARGET = {
  // * annotationcollection: Annotation collection
  book: 'book',
  section: 'chapter',
  conferencepaper: 'paper-conference',
  // * datamanagementplan: Data management plan
  article: 'article-journal',
  patent: 'patent',
  preprint: 'article',
  // * deliverable: Project deliverable
  // * milestone: Project milestone
  // * proposal: Proposal
  report: 'report',
  softwaredocumentation: 'report', // manual -> report
  // * taxonomictreatment: Taxonomic treatment
  // * technicalnote: Technical note
  thesis: 'thesis',
  workingpaper: 'manuscript',
  other: 'article'
}

const IMAGE_TYPES_TO_TARGET = {
  figure: 'figure',
  plot: 'figure',
  drawing: 'graphic',
  diagram: 'figure',
  photo: 'graphic',
  other: 'graphic'
}

const TYPES_TO_SOURCE = {
  article: ['publication', 'article'],
  'article-magazine': ['publication', 'article'],
  'article-newspaper': ['publication', 'article'],
  'article-journal': ['publication', 'article'],
  bill: ['publication', 'other'],
  book: ['publication', 'book'],
  broadcast: ['video'],
  chapter: ['publication', 'section'],
  classic: ['publication', 'other'],
  collection: ['other'],
  dataset: ['dataset'],
  document: ['other'],
  entry: ['publication', 'other'],
  'entry-dictionary': ['publication', 'other'],
  'entry-encyclopedia': ['publication', 'other'],
  event: ['other'],
  figure: ['image', 'figure'],
  graphic: ['image', 'other'],
  hearing: ['publication', 'other'],
  interview: ['publication', 'other'],
  legislation: ['publication', 'other'],
  legal_case: ['publication', 'other'],
  manuscript: ['publication', 'other'],
  map: ['image', 'other'],
  motion_picture: ['video'],
  musical_score: ['video'],
  pamphlet: ['publication', 'other'],
  'paper-conference': ['publication', 'conferencepaper'],
  patent: ['publication', 'patent'],
  post: ['publication', 'other'],
  'post-weblog': ['publication', 'other'],
  performance: ['other'],
  periodical: ['publication', 'other'],
  personal_communication: ['publication', 'other'],
  regulation: ['publication', 'other'],
  report: ['publication', 'report'],
  review: ['publication', 'article'],
  'review-book': ['publication', 'article'],
  song: ['video'],
  software: ['software'],
  speech: ['presentation'],
  standard: ['publication', 'softwaredocumentation'],
  thesis: ['publication', 'thesis'],
  treaty: ['publication', 'other'],
  webpage: ['publication', 'other']
}

const CONVERT = {
  DATE: {
    toTarget (iso) {
      return parseDate(iso)
    },
    toSource (date) {
      return formatDate(date)
    }
  },
  AUTHORS: {
    toTarget (authors) {
      return authors.map(author => ({
        ...parseName(author.name),
        _affiliation: author.affiliation,
        _orcid: author.orcid
      }))
    },
    toSource (authors) {
      return authors.map(author => ({
        name: formatName(author, /* reversed */ true),
        affiliation: author._affiliation,
        orcid: author._orcid
      }))
    }
  }
}

const WHEN = {
  ARTICLE: {
    source: { upload_type: 'publication', publication_type: 'article' },
    target: {
      type: ['article', 'article-newspaper', 'article-magazine', 'article-journal']
    }
  },
  BOOK: {
    source: { upload_type: 'publication', publication_type: 'book' },
    target: { type: 'book' }
  },
  CHAPTER: {
    source: { upload_type: 'publication', publication_type: 'section' },
    target: { type: 'chapter' }
  },
  THESIS: {
    source: { upload_type: 'publication', publication_type: 'thesis' },
    target: { type: 'thesis' }
  },
  PAPER_CONFERENCE: {
    source: { upload_type: 'publication', publication_type: 'conferencepaper' },
    target: { type: 'paper-conference' }
  }
}

const METADATA_PROPS = [
  {
    source: ['upload_type', 'publication_type', 'image_type'],
    target: 'type',
    convert: {
      toTarget (uploadType, publicationType, imageType) {
        if (uploadType === 'publication' && publicationType) {
          return PUBLICATION_TYPES_TO_TARGET[publicationType] || PUBLICATION_TYPES_TO_TARGET.other
        } else if (uploadType === 'image' && imageType) {
          return IMAGE_TYPES_TO_TARGET[imageType] || IMAGE_TYPES_TO_TARGET.other
        } else {
          return TYPES_TO_TARGET[uploadType] || TYPES_TO_TARGET.other
        }
      },
      toSource (type) {
        const [uploadType, secondaryType] = TYPES_TO_SOURCE[type] || ['other']
        if (uploadType === 'publication') {
          return [uploadType, secondaryType, undefined]
        } else if (uploadType === 'image') {
          return [uploadType, undefined, secondaryType]
        } else {
          return [uploadType, undefined, undefined]
        }
      }
    }
  },
  {
    source: 'publication_date',
    target: 'issued',
    convert: CONVERT.DATE
  },
  'title',
  {
    source: 'creators',
    target: 'author',
    convert: CONVERT.AUTHORS
  },
  {
    source: 'description',
    target: 'abstract'
  },
  {
    source: 'doi',
    target: 'DOI'
  },
  {
    source: 'keywords',
    target: 'keyword',
    convert: {
      toTarget (keywords) {
        return keywords
          .map(keyword => keyword.includes(',') ? `"${keyword}"` : keyword)
          .join(',')
      },
      toSource (keywords) {
        return keywords
          .match(/("(\\[\\"]|[^\\"])"|[^,]+)(?=,|$)/g)
          .map(keyword => keyword.replace(/^"|"$/g, ''))
      }
    }
  },
  {
    source: 'notes',
    target: 'annote'
  },
  {
    source: 'contributors',
    target: ['editor', 'producer'],
    convert: {
      toTarget (contributors) {
        const byType = contributors.reduce((byType, contributor) => {
          if (!byType[contributor.type]) byType[contributor.type] = []
          byType[contributor.type].push({
            ...parseName(contributor.name),
            _affiliation: contributor.affiliation,
            _orcid: contributor.orcid
          })
          return byType
        }, {})

        return [
          byType.Editors,
          byType.Producers
        ]
      },
      toSource (editors, producers) {
        return [
          ...editors.map(name => ['Editors', name]),
          ...producers.map(name => ['Producers', name])
        ].map(([type, name]) => ({
          type,
          name: formatName(name, /* reversed */ true),
          affiliation: name._affiliation,
          orcid: name._orcid
        }))
      }
    }
  },
  'version',
  {
    source: 'language',
    target: 'language',
    when: {
      source: true,
      target: { language (lang) { return lang.length === 2 || lang.length === 3 } }
    }
  },

  // Journal articles
  { source: 'journal_title', target: 'container-title', when: WHEN.ARTICLE },
  { source: 'journal_volume', target: 'volume', when: WHEN.ARTICLE },
  { source: 'journal_issue', target: 'issue', when: WHEN.ARTICLE },
  { source: 'journal_pages', target: 'page', when: WHEN.ARTICLE },

  // Conference papers
  { source: 'conference_title', target: 'event-title' },
  { source: 'conference_place', target: 'event-place' },
  {
    source: 'conference_dates',
    target: 'event-date',
    convert: {
      toTarget: parseDate,
      toSource (date) {
        return CONVERT.DATE.toSource(date) + ' to ' + CONVERT.DATE.toSource({
          'date-parts': [date['date-parts'][1]]
        })
      }
    }
  },
  { source: 'conference_session', target: 'volume', when: WHEN.PAPER_CONFERENCE },
  { source: 'conference_session_part', target: 'issue', when: WHEN.PAPER_CONFERENCE },

  // Book
  { source: 'imprint_publisher', target: 'publisher', when: WHEN.BOOK },
  { source: 'imprint_place', target: 'publisher-place' },
  { source: 'imprint_isbn', target: 'ISBN' },

  // Book section
  { source: 'partof_title', target: 'container-title', when: WHEN.SECTION },
  { source: 'partof_pages', target: 'page', when: WHEN.SECTION },

  // Thesis
  { source: 'thesis_university', target: 'publisher', when: WHEN.THESIS }
]

const metadataTranslator = new util.Translator(METADATA_PROPS)

export function parse (input) {
  const output = metadataTranslator.convertToTarget(input)

  return output
}

export function format (input) {
  return metadataTranslator.convertToSource(input)
}

export const VERSION = '1.0.0'
