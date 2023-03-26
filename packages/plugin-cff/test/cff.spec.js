/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import { inputTests, outputTests } from './cff'

describe('cff', function () {
  describe('input', function () {
    for (const { name, input, output } of inputTests) {
      it(name, function () {
        assert.deepStrictEqual(plugins.input.chain(input, { generateGraph: false }), output)
      })
    }
  })
  describe('output', function () {
    for (const { name, input, output } of outputTests) {
      it(name, function () {
        assert.deepStrictEqual(plugins.output.format('cff', input), output)
      })
    }
  })
})
