'use strict'

// const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

/**
 * The function calculates the sum of the top 'n' most commonly used hats in a database.
 * @param top - The "top" parameter is a number that represents the number of top hats to be considered
 * in the calculation. The function will return the sum of the number of occurrences of the top "top"
 * hats in the "database".
 * @returns The function `topHatsSum` is returning the sum of the top `top` most common hats in the
 * `database`. It does this by first creating an object `hats` that counts the number of occurrences of
 * each hat in the `database`. It then sorts the values of `hats` in descending order, takes the top
 * `top` values, and returns their sum.
 */
const topHatsSum = (top) => {
  const hats = {}
  database.forEach((u) =>
    u.hats.forEach((h) => {
      hats[h.id] = !hats[h.id] ? 1 : (hats[h.id] += 1)
    })
  )
  return Object.values(hats)
    .sort((n1, n2) => n2 - n1)
    .slice(0, top)
    .reduce((qSum, q) => qSum + q)
}
const TOP = 3
const TOTAL = topHatsSum(TOP)

// Throws error on failure
assert.equal(TOTAL, 23, `Invalid result: ${TOTAL} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *
 *   - time complexity: O(NMlog(M))
 * This function has a temporal complexity of O(NMlog(M)), where N is the number of elements in the database and M
 * is the number of unique hats. This is because the function iterates through each user in the database and then
 * iterates through each hat of each user, and for each unique hat an object hats is updated. Then an array of hats
 * values is sorted and reduced.
 *
 *   - space complexity: O(M)
 * The spatial complexity of this function depends on the number of unique hats in the database, so it is O(M) in the
 * worst case. This is because an object hats is used to store the count of unique hats.
 */
