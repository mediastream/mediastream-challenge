'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

function findTopSellingHatsSum (hatsData) {
  // Group hats by model and count how many of each model were sold
  const groupedHats = _.groupBy(hatsData, 'id')
  const hatCounts = _.map(groupedHats, (hats, model) => {
    return {
      model,
      count: hats.length
    }
  })

  // Sort hatCounts in descending order and sum the counts of the top 3 hats
  const sortedHatCounts = _.orderBy(hatCounts, ['count'], ['desc'])
  const topThreeHatCounts = _.take(sortedHatCounts, 3)
  const sum = _.sumBy(topThreeHatCounts, 'count')
  return sum
}

const hats = _.flattenDeep(database.map(obj => obj.hats ? obj.hats : obj))

const total = findTopSellingHatsSum(hats) // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
