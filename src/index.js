import Cite from 'citation-js'
import yaml from 'yamljs'

import * as cff from './cff'

// Cite.parse.addFormat('@else/yaml', {
//   parseType: {tokenList: {
//     split: /\n(\s{2})*(-\s)?/,
//     token: /^[\w\-]*: /
//   }},
//   parse: yaml.parse
// }, 'else')
//
// Cite.parse.addPlugin('software', {
//   '@cff/object': {
//     parseType: {propertyConstraint: {
//       props: 'cff-version',
//       value (version) { return version.startsWith('1.0.') }
//     }},
//     parse: parseCff
//   }
// })

Cite.parse.add('@else/yaml', {
  dataType: 'String',
  parseType: i => i.split(/\n(\s{2})*(-\s)?/).some(p => /^[\w-]*: /.test(p)),
  parse: yaml.parse
})

Cite.parse.add('@cff/object', {
  dataType: 'SimpleObject',
  propertyConstraint: {
    props: 'cff-version',
    value (version) { return version.startsWith('1.0.') }
  },
  parse: cff.parse
})

Cite.get.add('cff', function (data, options = {}) {
  let output = cff.format(data, options)
  if (options.type === 'object') {
    return output
  } else {
    return yaml.stringify(output, Infinity, 2)
  }
})
