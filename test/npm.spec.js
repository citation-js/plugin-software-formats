/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import { apiTests, urlTests } from './npm'

describe('npm', function () {
  describe('api', function () {
    for (let { name, input, output } of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }
  })
  describe('url', function () {
    for (let { name, input, output } of urlTests) {
      it(name, async function () {
        assert.deepStrictEqual(await plugins.input.chainAsync(input, { generateGraph: false }), output)
      })
    }
  })
})
