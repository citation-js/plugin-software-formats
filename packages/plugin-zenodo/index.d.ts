import type { CSL } from '@citation-js/core'

interface Person {
  affiliation?: string
  gnd?: string
  name?: string
  orcid?: string
}

interface Contributor extends Person {
  type?:
    | 'ContactPerson'
    | 'DataCollector'
    | 'DataCurator'
    | 'DataManager'
    | 'Distributor'
    | 'Editor'
    | 'HostingInstitution'
    | 'Other'
    | 'Producer'
    | 'ProjectLeader'
    | 'ProjectManager'
    | 'ProjectMember'
    | 'RegistrationAgency'
    | 'RegistrationAuthority'
    | 'RelatedPerson'
    | 'ResearchGroup'
    | 'RightsHolder'
    | 'Researcher'
    | 'Sponsor'
    | 'Supervisor'
    | 'WorkPackageLeader'
}

interface Identifier {
  identifier?: string
}

interface SchemeIdentifier extends Identifier {
  scheme:
    | 'ads'
    | 'ark'
    | 'arxiv'
    | 'bioproject'
    | 'biosample'
    | 'doi'
    | 'ean13'
    | 'ean8'
    | 'ensembl'
    | 'genome'
    | 'gnd'
    | 'hal'
    | 'handle'
    | 'isbn'
    | 'isni'
    | 'issn'
    | 'istc'
    | 'lsid'
    | 'orcid'
    | 'pmcid'
    | 'pmid'
    | 'purl'
    | 'refseq'
    | 'sra'
    | 'uniprot'
    | 'url'
    | 'urn'
    | 'swh'
    | 'ascl'
}

interface Subject extends SchemeIdentifier {
  term?: string
}

interface RelatedIdentifier extends SchemeIdentifier {
  relation?:
    | 'isCitedBy'
    | 'cites'
    | 'isSupplementTo'
    | 'isSupplementedBy'
    | 'isContinuedBy'
    | 'continues'
    | 'isDescribedBy'
    | 'describes'
    | 'hasMetadata'
    | 'isMetadataFor'
    | 'isNewVersionOf'
    | 'isPreviousVersionOf'
    | 'isPartOf'
    | 'hasPart'
    | 'isReferencedBy'
    | 'references'
    | 'isDocumentedBy'
    | 'documents'
    | 'isCompiledBy'
    | 'compiles'
    | 'isVariantFormOf'
    | 'isOrignialFormOf'
    | 'isIdenticalTo'
    | 'isAlternateIdentifier'
    | 'isReviewedBy'
    | 'reviews'
    | 'isDerivedFrom'
    | 'isSourceOf'
    | 'requires'
    | 'isRequiredBy'
    | 'isObsoletedBy'
    | 'obsoletes'
  resource_type?: string
  [k: string]: unknown
}

interface Record {
  $schema?: string
  access_conditions?: string
  access_right?: 'open' | 'embargoed' | 'restricted' | 'closed'
  communities?: Identifier[]
  contributors?: Contributor[]
  creators?: Person[]
  description?: string
  doi?: string
  embargo_date?: string
  grants?: { id?: string }[]
  imprint_isbn?: string
  imprint_place?: string
  imprint_publisher?: string
  journal_issue?: string
  journal_pages?: string
  journal_title?: string
  journal_volume?: string
  keywords?: string[]
  license?: string
  conference_acronym?: string
  conference_dates?: string
  conference_place?: string
  conference_session?: string
  conference_session_part?: string
  conference_title?: string
  conference_url?: string
  notes?: string
  partof_pages?: string
  partof_title?: string
  publication_date?: string
  references?: string[]
  related_identifiers?: RelatedIdentifier[]
  upload_type?:
    | 'publication'
    | 'poster'
    | 'presentation'
    | 'dataset'
    | 'image'
    | 'video'
    | 'software'
    | 'lesson'
    | 'physicalobject'
    | 'other'
  publication_type?:
    | 'book'
    | 'section'
    | 'conferencepaper'
    | 'article'
    | 'patent'
    | 'preprint'
    | 'report'
    | 'deliverable'
    | 'milestone'
    | 'proposal'
    | 'softwaredocumentation'
    | 'thesis'
    | 'technicalnote'
    | 'workingpaper'
    | 'datamanagementplan'
    | 'annotationcollection'
    | 'taxonomictreatment'
    | 'other'
  image_type?: string
  openaire_type?: string
  subjects?: Subject[]
  thesis_supervisors?: Person[]
  thesis_university?: string
  title?: string
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@zenodo/metadata+object': (input: Record) => CSL
      }
    }
    namespace output {
      interface Formats {
        zenodo:
          | ((options?: { type?: 'text' }) => string)
          | ((options: { type: 'object' }) => Record)
      }
    }
  }
}
