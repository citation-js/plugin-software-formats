import { plugins } from '@citation-js/core'
import yaml from 'yamljs'

import * as cff from './cff'
import * as gh from './gh'
import * as npm from './npm'

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
      parse: yaml.parse
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
          value (version) { return version.startsWith('1.0.') }
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
        return yaml.stringify(output, Infinity, 2)
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
        predicate: /^https?:\/\/github.com\/[^/]+\//,
        extends: '@else/url'
      },
      parse: gh.url
    },
    '@github/api': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/api.github.com\/repos\/[^/]+\//,
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
            return /^https?:\/\/api.github.com\/repos\/[^/]+\//.test(url)
          }
        }
      },
      parseAsync: gh.json
    }
  }
})

// npm
plugins.add('npm', {
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
        predicate: /^https?:\/\/registry.npmjs.org\//,
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
