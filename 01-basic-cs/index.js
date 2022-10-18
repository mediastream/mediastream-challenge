'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// Create hash
const itemList = {}
database.forEach(item => {
  item.hats.forEach(hat => {
    if (hat.id in itemList) { itemList[hat.id] += 1 } else { itemList[hat.id] = 1 }
  })
})

// Convert to array
const itemArr = []
for (const key in itemList) {
  itemArr.push({ id: key, count: itemList[key] })
}

// Sort array
const sortArr = _.sortBy(itemArr,
  [function (o) { return o.count }])

// Take top 3 sellers
const topSellers = _.takeRight(sortArr, 3)

// total sum
const total = topSellers.reduce((total, item) => { return total + item.count }, 0) // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(N^2)
 *   - space complexity: O(N)
 */
