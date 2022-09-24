'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// find all hats object into array
const hats = _.map(database, (value) => {
  return value.hats
}).flat()

// group by id and get size for every one
const hatSizes = _.mapValues(_.groupBy(hats, 'id'), _.size)

// order by size
const result = _.orderBy(hatSizes).reverse()

// sum first 3
const total = _.sum(_.take(result, 3)) // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n) where n depends of the size of hats sales into the database
 *   - space complexity: O(n)  where n depends of the size of hats sales into the database
 */
