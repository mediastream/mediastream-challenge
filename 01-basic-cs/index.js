'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const total = _.sum(_.orderBy(_.countBy(database.flatMap((user) => user.hats.flatMap((hats) => hats.id)))).slice(-3))

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
