/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { Cite, plugins } from '@citation-js/core'
import { inputTests, outputTests } from './cff'

describe('cff', function () {
  describe('input', function () {
    for (let { name, input, output } of inputTests) {
      it(name, function () {
        assert.deepStrictEqual(plugins.input.chain(input, { generateGraph: false }), output)
      })
    }
  })
  describe('output', function () {
    for (let { name, input, output } of outputTests) {
      it(name, function () {
        assert.deepStrictEqual(Cite(input).format('cff'), output)
      })
    }
  })
})
