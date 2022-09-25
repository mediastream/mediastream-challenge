'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatsList = _.flatMap(database, (item) => item.hats, 2)
const hatsCounted = _.countBy(hatsList, 'id')
const maxSelling = _(Object.values(hatsCounted)).sortBy().takeRight(3).value()

const total = _(maxSelling).sum()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity:  O(N + M + C)
 *   - space complexity: O(2N + 3 )
 */
