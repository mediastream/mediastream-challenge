'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const mostSoldHats2 = _.flatMap(database, (n) => n.hats)
const count = _.countBy(mostSoldHats2, 'id')
const ordered = _.orderBy(count, null, 'desc').slice(0, 3)
const total = _.sum(ordered)

assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
/*
Space complexity: O(n), where n is the number of hats in the database.
This is because we create a new array mostSoldHats that contains all the hats in the database, and then we create a new object count that contains the count of each hat. Finally, we create a new array ordered that contains the top 3 most sold hats. All of these data structures require space proportional to the number of hats in the database.

Time complexity: O(n log n), where n is the number of hats in the database.
This is because we use the flatMap method to create the mostSoldHats array, which takes O(n) time. Then we use the countBy method to create the count object, which also takes O(n) time. Finally, we use the orderBy method to sort the count object, which takes O(n log n) time. The slice method takes constant time, so it doesn't affect the overall time complexity. Therefore, the overall time complexity is O(n log n).

*/
