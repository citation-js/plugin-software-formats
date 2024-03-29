/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import { apiTests, urlTests } from './gh'
import '../../../test/cache/mock'

describe('github', function () {
  describe('api', function () {
    for (const { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }
  })
  describe('url', function () {
    for (const { name, input, output } of urlTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }
  })
})
