'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const sortData = (previus, next) => Number(next.count) - Number(previus.count)

const groupElements = _(database)
  .map((obj) => obj.hats)
  .flatMap()
  .groupBy('name')
  .map((items, id) => {
    return {
      name: id,
      price: _.sumBy(items, (item) => Number(item?.price)).toFixed(2),
      count: items.length
    }
  })
  .value() // O(n)

const topElements = groupElements.sort(sortData).slice(0, 3) // O(nlogn)
const total = _.sumBy(topElements, (res) => Number(res.count)) // O(n)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log(n))
 *   - space complexity: TODO
 */
