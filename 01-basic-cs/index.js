'use strict'

const assert = require('assert')

const database = require('./database.json')
const { forEach, filter, orderBy, reverse, take, uniqBy, sumBy } = require('lodash')

let total = 0 // TODO

const calculateSoldHatsById = (hatId) => {
  let number = 0
  for (const invoice of database) {
    if (invoice?.hats.length) {
      number += filter(invoice?.hats, { id: hatId }).length
    }
  }
  return number
}

const calculateTopSellerHats = () => {
  let hatSalesNumber = []

  forEach(database, (inv) => {
    if (inv.hats.length) {
      for (const hat of inv.hats) {
        hatSalesNumber = [...hatSalesNumber,
          { id: hat.id, sold: calculateSoldHatsById(hat.id) }
        ]
      }
    }
  })

  total = sumBy(take(reverse(orderBy(uniqBy(hatSalesNumber, 'id'), 'sold')), 3), 'sold')
}

calculateTopSellerHats()
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)
console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n2)
 *   - space complexity: O(v2)
 */
