import { plugins } from '@citation-js/core'
import yaml from 'js-yaml'
import { CFF_SCHEMA } from './cff-yaml'

import * as cff from './cff'
import * as gh from './gh'
import * as npm from './npm'
import * as zenodo from './zenodo'

// YAML
plugins.add('@else', {
  input: {
    '@else/yaml': {
      parseType: {
        dataType: 'String',
        tokenList: {
          split: /\n(\s{2})*(-\s)?/,
          token: /^[\w-]*: /,
          every: false
        }
      },
      parse (file) {
        return yaml.load(file, { json: true })
      }
    }
  }
})

// Citation File Format
plugins.add('@cff', {
  input: {
    '@cff/object': {
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: 'cff-version',
          value (version) { return version.startsWith('1.') }
        }
      },
      parse: cff.parse
    }
  },
  output: {
    cff (data, options = {}) {
      const output = cff.format(data, options)
      if (options.type === 'object') {
        return output
      } else {
        return yaml.dump(output, { schema: CFF_SCHEMA })
      }
    }
  }
})

// GitHub
plugins.add('@github', {
  config: gh.config,
  input: {
    '@github/url': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/github\.com\/[^/]+\//,
        extends: '@else/url'
      },
      parse: gh.url
    },
    '@github/api': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/api\.github\.com\/repos\/[^/]+\//,
        extends: '@else/url'
      },
      parseAsync: gh.api
    },
    '@github/object': {
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: 'url',
          value (url) {
            return /^https?:\/\/api\.github\.com\/repos\/[^/]+\//.test(url)
          }
        }
      },
      parseAsync: gh.json
    }
  }
})

// npm
plugins.add('@npm', {
  input: {
    '@npm/url': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/(www\.)?(npmjs\.com|npmjs\.org|npm\.im)\/(package)?/,
        extends: '@else/url'
      },
      parse: npm.url
    },
    '@npm/api': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/registry\.npmjs\.org\//,
        extends: '@else/url'
      },
      parseAsync: npm.api
    },
    '@npm/object': {
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: 'versions',
          value (versions) {
            for (const version in versions) {
              if ('_npmUser' in versions[version] ||
                  '_npmVersion' in versions[version]) {
                return true
              }
            }
            return false
          }
        }
      },
      parseAsync: npm.json
    }
  }
})

// Zenodo
plugins.add('@zenodo', {
  input: {
    '@zenodo/metadata+object': {
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: 'upload_type'
        }
      },
      parse: zenodo.parse
    }
  },
  output: {
    '.zenodo.json' (data, options = {}) {
      const output = zenodo.format(data)
      if (options.type === 'object') {
        return output
      } else {
        return JSON.stringify(output, null, 2)
      }
    }
  }
})
