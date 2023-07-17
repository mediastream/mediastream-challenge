'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatsCount = _.chain(database)
  .flatMap('hats')
  .countBy('id')
  .toPairs()
  .orderBy(([hatId, count]) => count, 'desc')
  .slice(0, 3)
  .value()

const total = _.sumBy(hatsCount, ([hatId, count]) => count)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n + m log m)
 *   - space complexity: O(n + m)
 */

/*
  In this file, on line 8, I add a chain function that starts a chain of functions using lodash for the information fetched from the database constant.
  I use the flatMap method to retrieve the hats property from each element in the database constant. I Use the countBy method to count the occurrences
  of each element based on the id. Then, i use the toPairs method to convert the content into an array with the id values as keys and the occurrences as
  values. Next,i use the orderBy method to sort the values in descending order and the slice method to take only the top three values. Finally, i use the
  value function to end the lodash chain of functions and return the final result.
*/

/*
  Analyzing the algorithm and given its complexity we can determine that the time and space complexity are:
  Time complexity: O(n + m log m), where n is the total number of hats sold and m is the total number of distinct hats sold.
  Space complexity: O(n + m), where n is the total number of hats sold and m is the total number of different hats sold.

  n = 117 -> total number of hats sold
  m = 28 -> total number of different hats sold
*/
