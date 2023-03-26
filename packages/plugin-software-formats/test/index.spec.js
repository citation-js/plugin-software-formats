/* eslint-env mocha */

import '../src/'

import assert from 'assert'
import { plugins } from '@citation-js/core'

describe('has plugin for', function () {
  it('cff', () => { assert(plugins.has('@cff')) })
  it('github', () => { assert(plugins.has('@github')) })
  it('npm', () => { assert(plugins.has('@npm')) })
  it('zenodo', () => { assert(plugins.has('@zenodo')) })
  it('yaml', () => {
    assert(plugins.input.has('@else/yaml'))
    assert(plugins.output.has('yaml'))
  })
})
