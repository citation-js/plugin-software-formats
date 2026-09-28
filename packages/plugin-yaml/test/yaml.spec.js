/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'

describe('yaml', function () {
  describe('input', function () {
    it('outputs dates without a timestamp', function () {
      const output = plugins.output.format('yaml', [{
        issued: new Date('2026-09-28')
      }])
      assert.deepStrictEqual(output, '- issued: 2026-09-28\n')
    })
  })
})
