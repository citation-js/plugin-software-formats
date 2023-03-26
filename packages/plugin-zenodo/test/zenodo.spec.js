/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'
import { inputTests } from './zenodo'

describe('zenodo', function () {
  describe('input', function () {
    for (const { name, input, output } of inputTests) {
      it(name, function () {
        assert.deepStrictEqual(plugins.input.chain(input, { generateGraph: false }), output)
      })
    }
  })
})
