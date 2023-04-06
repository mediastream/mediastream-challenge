'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const onlyHats = database.filter((d) => d.hats.length !== 0).map((e) => {
  return e.hats
}).flat()

const soldHats = Object.values(_.countBy(onlyHats, 'id'))

const firstThreeHats = _.orderBy(soldHats, [], ['desc']).slice(0, 3)

const total = _.sum(firstThreeHats)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
