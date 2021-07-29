import yaml from 'js-yaml'

// See https://github.com/nodeca/js-yaml/issues/569

const timestampTag = 'tag:yaml.org,2002:timestamp'
const timestamp = yaml.DEFAULT_SCHEMA.compiledTypeMap.scalar[timestampTag]

const date = new yaml.Type(timestampTag, {
  kind: 'scalar',
  resolve: timestamp.resolve,
  construct: timestamp.construct,
  instanceOf: Date,
  represent (object) {
    return object.toISOString().split('T')[0]
  }
})

const CFF_SCHEMA = yaml.DEFAULT_SCHEMA.extend({
  implicit: [date],
  explicit: []
})

export { CFF_SCHEMA }
