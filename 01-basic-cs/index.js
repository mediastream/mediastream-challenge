'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const mostSelling = _.orderBy(database, ['hats'], ['desc']).slice(0, 3) // TODO
const total = _.sumBy(mostSelling, (sell) => sell.hats.length)

// Throws error on failure with data in file the correct result is 15
assert.equal(total, 15, `Invalid result: ${total} != 15`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n) => OrderBy O(n) + slice O(3) + sumBy O(3)
 *   - space complexity: O(4) => mostSelling Array[3] O(3) + totral O(1)
 */
