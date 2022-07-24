'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let hats = []
const withHats = _.filter(database, (sale) => sale.hats.length > 0)
_.map(withHats, (sale) => {
  hats = hats.concat(sale.hats)
})
const sortedHats = _.orderBy(_.countBy(hats, 'id'), null, ['desc'])
const total = sortedHats.splice(0, 3).reduce((prev, current) => { return prev + current }, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n) + O(2m)
 */
