import * as yaml from 'js-yaml'
import { plugins } from '@citation-js/core'

// See https://github.com/nodeca/js-yaml/issues/569
const timestampTag = 'tag:yaml.org,2002:timestamp'
const timestamp = yaml.DUMP_SCHEMA.tags.find(tag => tag.tagName === timestampTag)

const dateTag = yaml.defineScalarTag(timestampTag, {
  implicit: true,
  resolve: timestamp.resolve,
  identify: timestamp.identify,
  represent (object) {
    return object.toISOString().split('T')[0]
  }
})

const CFF_SCHEMA = yaml.DUMP_SCHEMA.withTags(dateTag)

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
  },
  output: {
    yaml (data) {
      return yaml.dump(data, { schema: CFF_SCHEMA })
    }
  }
})
