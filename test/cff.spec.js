/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import Cite from 'citation-js'
import {inputTests, outputTests} from './cff'

describe('cff', function () {
  describe('input', function () {
    for (let {name, input, output} of inputTests) {
      it(name, function () {
        assert.strictEqual(Cite.input(input, {generateGraph: false}), output)
      })
    }
  })
  describe('output', function () {
    for (let {name, input, output} of outputTests) {
      it(name, function () {
        assert.strictEqual(Cite(input).format('cff'), output)
      })
    }
  })
})
