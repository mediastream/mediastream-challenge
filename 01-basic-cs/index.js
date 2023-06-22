'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const total = _.chain(database)
  .map(userFromDB => userFromDB.hats) // Get only the hats
  .omitBy(_.isEmpty) // Remove empty array of hats
  .values() // Get only the array of hats of every user instead of keys
  .flatten() // Get only one array with all hats
  .countBy('id') // Count how many of every hat has been purchased
  .toPairs() // Convert ever object {id: count} to array [id, count]
  .sortBy(hat => hat[1]) // sort by count (second element of every [id, count] array)
  .takeRight(3) // Select first three elements
  .sumBy(hat => hat[1]) // Sum the top three elements
  .value()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity:
 * The methods 'map', 'omitBy', 'flatten', 'countBy' and 'toPairs' have a
 * time complexity of O(n) since the have to access every element of the array
 * to apply their functions.
 *
 * The method 'sortBy' has a time complexity of O(n Log n) since it uses a special
 * sorting algorithm
 *
 * the methods 'takeRight' and 'sumBy' have a time complexity of O(k), where k
 * is the number of elements to operate.
 *
 * In conclusion, the time complexity of this algorithm depends on the length of
 * the array in the database and the qantity of elements to take into account
 * in the final sum. In general the time complexity is O(n Log n) due to the method
 * 'sortBy', wich has the higher time complexity.
 *
 *   - space complexity:
 * In this case, the space complexity is O(n), where n is the number of elements
 * in the database. This is because every operation in the chain returns a new array,
 * and, in general (taking worst case scenario), the space required to store these arrays
 * is proportional to the size of array in the database.
 */
