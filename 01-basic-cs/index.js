'use strict'

const assert = require('assert')

const database = require('./database.json')
const groupHats = (searchHatId) => {
  return database.reduce((acc, seller) => {
    seller.hats.forEach(hat => {
      const hatId = searchHatId || hat.id
      if (!acc[hatId]) acc[hatId] = 0
      if (hat.id === hatId) acc[hatId] += 1
    })

    return acc
  }, {})
}
const findTopHatsSold = ({ hats = {}, top = 3 }) => {
  return Object.fromEntries(
    Object.entries(hats)
      .sort(([, a], [, b]) => b - a).slice(0, top))
}

const sumTotalHats = (hats = {}) => {
  let total = 0
  Object.values(hats).forEach(totalSold => {
    total += totalSold
  })

  return total
}

const hats = groupHats()
const topHats = findTopHatsSold({ hats, top: 3 })
const total = sumTotalHats(topHats)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
