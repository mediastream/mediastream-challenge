'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')
const { topSelling } = require('./utils/top_selling')

const total = topSelling()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
