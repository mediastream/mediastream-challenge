'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const getTotalSales = () => {
  const hats = _.flatMap(database, 'hats')
  const hatSales = _.countBy(hats, 'id')
  const sortHats = _.orderBy(
    _.keys(hatSales),
    (hatId) => hatSales[hatId],
    'desc'
  )
  const top3Hats = _.slice(sortHats, 0, 3)
  const totalSales = _.sum(_.map(top3Hats, (hatId) => hatSales[hatId]))

  return totalSales
}

const total = getTotalSales()

// Throws an error if the total is not equal to 23
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log(`The total sales of the top-3 hats is: ${total} hats`)

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n + d)
 */
