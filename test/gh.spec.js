/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import Cite from 'citation-js'
import {apiTests, urlTests} from './gh'

describe('github', function () {
  describe('api', function () {
    for (let {name, input, output} of apiTests) {
      it(name, async function () {
        assert.deepStrictEqual(await Cite.inputAsync(input, {generateGraph: false}), output)
      })
    }
  })
  describe('url', function () {
    for (let {name, input, output} of urlTests) {
      it(name, async function () {
        assert.deepStrictEqual(await Cite.inputAsync(input, {generateGraph: false}), output)
      })
    }
  })
})
