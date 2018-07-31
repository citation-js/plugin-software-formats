import {Translator} from './translator'

import Cite from 'citation-js'

/**
 * Format: GitHub API results (GH API) version 3
 * Page: https://developer.github.com/v3/
 */

let propMaps = {
  name: 'title-short',
  full_name: 'title',
  description: 'abstract',
  html_url: 'URL',
  pushed_at: 'issued',
  contributors_url: 'author'
}

async function parseValue (prop, value) {
  switch (prop) {
    case 'contributors_url':
      let contributors = await api(value)
      contributors = await Promise.all(contributors.map(({url}) => api(url)))
      return contributors.map(({name}) => name).map(Cite.parse.name)

    case 'pushed_at':
      return Cite.parse.date(value)

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
  }

  return output
}

export async function api (input) {
  let output = await Cite.util.fetchFileAsync(input, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'citation.js.org'
    }
  })
  return JSON.parse(output)
}

export function url (input) {
  let [, user, repo] = input.match(/^https?:\/\/github.com\/([^/]+)\/([^/]+)/)
  return `https://api.github.com/repos/${user}/${repo}`
}
