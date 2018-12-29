import { util } from '@citation-js/core'
import { parse as parseDate } from '@citation-js/date'
import { parse as parseName } from '@citation-js/name'

/**
 * Format: npm API results
 */

let propMaps = {
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

export async function json (input) {
  let output = {
    type: 'book'
  }

  for (let prop in propMaps) {
    if (prop in input) {
      output[propMaps[prop]] = await parseValue(prop, input[prop])
    }

    const { latest } = input['dist-tags']
    output.version = latest
    output.issued = parseDate(input.time[latest])
  }

  return output
}

export async function api (input) {
  let output = await util.fetchFileAsync(input)
  return JSON.parse(output)
}

export function url (input) {
  let [, pkg] = input.match(/((@[^/]+\/)?[^/]+)$/)
  return `https://registry.npmjs.org/${pkg}`
}
