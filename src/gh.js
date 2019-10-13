import { util } from '@citation-js/core'
import { parse as parseDate } from '@citation-js/date'
import { parse as parseName } from '@citation-js/name'

/**
 * Format: GitHub API results (GH API) version 3
 * Page: https://developer.github.com/v3/
 */

const propMaps = {
  name: 'title-short',
  full_name: 'title',
  description: 'abstract',
  html_url: 'URL',
  pushed_at: 'issued',
  contributors_url: 'author'
}

async function parseValue (prop, value) {
  switch (prop) {
    case 'contributors_url': {
      let contributors = await api(value)
      contributors = await Promise.all(contributors.map(({ url }) => api(url)))
      return contributors.map(({ name, login }) => name ? parseName(name) : { literal: login })
    }

    case 'pushed_at':
      return parseDate(value)

    default:
      return value
  }
}

export const config = {
  apiToken: null
}

export async function json (input) {
  const output = {
    type: 'book'
  }

  for (const prop in propMaps) {
    if (prop in input) {
      output[propMaps[prop]] = await parseValue(prop, input[prop])
    }
  }

  return output
}

export async function api (input) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'citation.js.org'
  }

  if (config.apiToken) { headers.Authorization = `token ${config.apiToken}` }

  const output = await util.fetchFileAsync(input, { headers })
  return JSON.parse(output)
}

export function url (input) {
  const [, user, repo] = input.match(/^https?:\/\/github.com\/([^/]+)\/([^/]+)/)
  return `https://api.github.com/repos/${user}/${repo}`
}
