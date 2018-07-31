import Cite from 'citation-js'
import yaml from 'yamljs'

import * as cff from './cff'

Cite.plugins.add('@else', {
  input: {
    '@else/yaml': {
      parseType: {
        dataType: 'String',
        tokenList: {
          split: /\n(\s{2})*(-\s)?/,
          token: /^[\w\-]*: /,
          every: false
        }
      },
      parse: yaml.parse
    }
  }
})

Cite.plugins.add('@cff', {
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
      let output = cff.format(data, options)
      if (options.type === 'object') {
        return output
      } else {
        return yaml.stringify(output, Infinity, 2)
      }
    }
  }
})
