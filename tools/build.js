var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var babelify = require('babelify')

browserify()
  .exclude(['@citation-js/core', '@citation-js/date', '@citation-js/name'])
  .require('./src/index.js', { expose: '@citation-js/plugin-software-formats' })
  .transform(babelify, { global: true })
  .bundle()
  .pipe(fs.createWriteStream(path.join(__dirname, '../build/citation-software.js')))
