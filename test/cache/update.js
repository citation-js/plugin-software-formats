const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const cache = {}

const modulePath = require.resolve('@citation-js/core/lib/util/fetchFile.js')
require(modulePath)

const mockModule = require.cache[modulePath]
const old = mockModule.exports.fetchFileAsync
mockModule.exports.fetchFileAsync = function ours (url, ...args) {
  return old.call(this, url, ...args)
    .then(response => (cache[url] = response))
}

const { Cite, plugins } = require('@citation-js/core')
require('../..')
plugins.config.get('@github').setApiToken(process.env.GITHUB_OAUTH_TOKEN)

require('@babel/register')
const gh = require('../gh')
const npm = require('../npm')

const tests = [
  ...gh.apiTests,
  ...gh.urlTests,
  ...npm.apiTests,
  ...npm.urlTests
]

async function main () {
  for (const test of tests) {
    console.log((await Cite.async(test.input)).data[0].id)
  }

  await fs.promises.writeFile(
    path.join(__dirname, 'cache.json'),
    JSON.stringify(cache)
  )
}

main().catch(console.error)
