'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const topHats = _.reduce(
  database,
  (acc, item) => {
    _.forEach(item.hats, (hat) => {
      acc.hatsCount[hat.name] = (acc.hatsCount[hat.name] || 0) + 1
    })

    return acc
  },
  { hatsCount: {}, top3: [] }
)

topHats.top3 = _.chain(topHats.hatsCount)
  .toPairs()
  .orderBy([1], ['desc'])
  .take(3)
  .fromPairs()
  .value()

const total = _.sum(_.values(topHats.top3))

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: The time complexity of the logic mainly comes from iterating over all hats in the database, which is O(n), where n represents the total number of hats in the database. The sorting and selection step for the top three hats has a smaller impact on the time complexity since we are only interested in the top three elements, so the cost of this step is relatively low in practice.
 *   - space complexity: The space complexity of the logic is O(n), where n is the number of unique hats in the database. This is because we store the count of each hat in the hatsCount object. In addition, we store the top three hats in the top3 object, but this doesn't significantly affect the space complexity, as the size is constant (3).
 */
