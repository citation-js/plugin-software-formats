import { plugins, util } from '@citation-js/core'
import { parse as parseDate } from '@citation-js/date'
import { parse as parseName } from '@citation-js/name'

/**
 * Format: npm API results
 */

const propMaps = {
  name: 'title',
  description: 'abstract',
  homepage: 'URL',
  author: 'author'
}

async function parseValue (prop, value) {
  switch (prop) {
    case 'author':
      return [parseName(value.name)]

    default:
      return value
  }
}

async function json (input) {
  const output = {
    type: 'software',
    custom: { versions: [] }
  }

  for (const prop in propMaps) {
    if (prop in input) {
      output[propMaps[prop]] = await parseValue(prop, input[prop])
    }

    const { latest } = input['dist-tags']
    output.version = latest
    output.issued = parseDate(input.time[latest])
  }

  for (const version in input.versions) {
    output.custom.versions.push({
      version,
      issued: parseDate(input.time[version])
    })
  }

  return output
}

async function api (input) {
  const output = await util.fetchFileAsync(input)
  return JSON.parse(output)
}

function url (input) {
  const [, pkg] = input.match(/((@[^/]+\/)?[^/]+)$/)
  return `https://registry.npmjs.org/${pkg}`
}

plugins.add('@npm', {
  input: {
    '@npm/url': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/(www\.)?(npmjs\.com|npmjs\.org|npm\.im)\/(package)?/,
        extends: '@else/url'
      },
      parse: url
    },
    '@npm/api': {
      parseType: {
        dataType: 'String',
        predicate: /^https?:\/\/registry\.npmjs\.org\//,
        extends: '@else/url'
      },
      parseAsync: api
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
      parseAsync: json
    }
  }
})
