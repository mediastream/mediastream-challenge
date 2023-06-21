'use strict'
const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')
const database = require('./database.json')

const HATS_TO_RETRIEVE_COUNT = 3
const INDEX_OF_PURCHASES_FOR_GIVEN_HAT = 1
const topThreeHatsSold = _
  .chain(database)
  .map((purchase) => purchase.hats) // get all hats.
  .omitBy(_.isEmpty) // omit empty arrays.
  .reduce((acc, userHatPurchases) => acc.concat(userHatPurchases), []) // reduce all hat purchases to a single array
  .countBy((purchase) => purchase.id) // get the count of all occurrences of a given hat in purchases
  .toPairs()
  .sortBy(hat => hat[INDEX_OF_PURCHASES_FOR_GIVEN_HAT]) // sort by count
  .takeRight(HATS_TO_RETRIEVE_COUNT)
  .value()

const total = _.sumBy(topThreeHatsSold, (hats) => hats[INDEX_OF_PURCHASES_FOR_GIVEN_HAT])
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity breakthrough:
 *      1. wrap the database in a chain object O(1) since assignment to an object is constant.
 *      2. map each user purchase to an array of hats is O(n) since for each purchase, we append the hat purchases to an array.
 *      3. omitBy is O(n) since we get through the whole array of hat purchases and we filter out empty array.
 *      4. reduce is O(n) given that for each purchase, we reduce that purchase to an array of hat purchases.
 *      5. countBy is O(n) since we grab each hat object and count how many occurrences of a given hatId had been purchased.
 *      6. toPairs is O(n) since for each object, we convert it to a tuple [hatId, ocurrencesOfGivenHat].
 *      7. sortBy is O(n) because we need to get through the whole array once to sort it.
 *      8. slice is O(3) since we need to access the -3 index and grab -3, -2, -1 indexes (the most sold hats) and accessing an array index is constant.
 *      9. sumBy is O(n) since we need to access each element of the array and accumulate the value.
 *    Therefore: time complexity for this algorithm is O(n) at worst: O(1+n+n+n+n+n+n+3+n) = O(n)
 *
 *   - space complexity breakthrough:
 *     1. Database is an composed object of users with their purchases, space complexity for this database is O(n*m)
 *       where n is the purchase/user information and m is the hats that a given user has purchased
*      2. Wrap the object in a lodash chain is O(n).
 *     3. map each purchase to an array of hats is O(n+m) where M is the new array and n is each hats object inside of a purchase
 *     4. omitBy is O(n-m) because we're reducing the amount of memory we've created on 3, getting rid of each empty array
 *     5. reduce is O(n) because although we've created a new array with all purchases, when reduce ends, garbage collector should have destroyed the reference to the previous array
 *     6. countBy is O(n) because we are creating an object for each entry in the array, where that object is composed of [hatId, hatCount]
 *     7. toPairs is O(n*m) because for each object we are converting it to a tuple, effectively creating a new array composed of [hatId, hatCount]
 *     8. slice is O(n) because we're creating a new array of 3 elements, but being an array and not a primitive, the space complexity is still n
 *     9. sumBy is O(1) because when finished, sumBy will return a number which is a primitive, ergo, O(1)
 *
 *   Therefore: space complexity for this algorithm is O(n*m) at worst
 */
