'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

/**
 * CHALLENGE
 * There is a database of users and their hats at './database.json'.
 *
 * Tasks
 * 1. Find the total sum of the top-3 most selling hats. You can use lodash/underscore (recommended)
 * 2. What is the complexity in O() notation of time and space? Complete the comment with the right answer.
 *
 * IMPORTANT: Find a balance between performance and legibility.
 *
 * Example:
 *
 * Imagine the following (taken from the real database):
 *
 *    Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
 *    Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
 *    Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
 *    Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.
 *
 * -> Expected result: 9 + 7 + 7 => 23
 */

const database = require('./database.json')

/**
 * Step 1:
 *   Get all hats from the database users with hats
 *   Data is scanned per-row and concatenate in one pass of all elements
 *
 *   Complexity:
 *     - time:  O(n) - linear (n=50)
 *     - space: O(n) - linear (n=117)
 */
let db = []
_.map(database, user => { db = _.concat(db, user.hats) })
// console.log(db.length, database.length)

/**
 * Step 2:
 *   Hats Keys counted | { id: count } simple object
 *   Data is scanned per-row and aggregated in one pass of all elements
 *
 *   Complexity:
 *     - time:  O(n) - linear (n=117)
 *     - space: O(n) - linear (n=28)
 */
const oCounted = _.countBy(db, 'id')

/**
 * Step 3:
 *   Hats counted | [{ id, n }] unordered array
 *   Data is scanned per-row and asigned to array in one pass of all elements
 *
 *   Complexity:
 *     - time:  O(n) - linear (n=28)
 *     - space: O(n) - linear (n=28)
 */
const arrCounted = _.map(oCounted, (n, id) => ({ id, n }))

/**
 * Step 4:
 *   Sort by n desc | [{ id, n }] ordered array
 *
 *   Complexity:
 *     - time:  O(n log n) - linearithmic (average case) (n=28)
 *     - time:  O(n^2)     - quadratic (worst case)      (n=28)
 *     - space: O(n)       - linear                      (n=28)
 */
const arrOrdered = _.orderBy(arrCounted, 'n', 'desc')

/**
 * Step 5:
 *   Get only first 3 records | [{ id, n }] ordered array
 *
 *   Complexity:
 *     - time:  O(n) - linear (n=3)
 *     - space: O(n) - linear (n=3)
 */
const firstThree = _.take(arrOrdered, 3)

/**
 * Step 6:
 *   Sum by property in ordered array<object> | number
 *
 *   Complexity:
 *     - time:  O(n) - linear   (n=3)
 *     - space: O(1) - constant (n=1)
 */
const total = _.sumBy(firstThree, 'n')

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)
console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity:
 *
 *     - Step 1: O(n)   =>   n =  50   =>   50  // db
 *     - Step 2: O(n)   =>   n = 117   =>  117  // oCounted
 *     - Step 3: O(n)   =>   n =  28   =>   28  // arrCounted
 *     - Step 4: O(n^2) =>   n =  28   =>  784  // arrOrdered (take the worst case)
 *     - Step 5: O(n)   =>   n =   3   =>    3  // firstThree
 *     - Step 6: O(n)   =>   n =   3   =>    3  // total
 *                                        -----
 *                              TOTAL  ~=  985
 *
 *   - space complexity:
 *     - Step 1: O(n)   =>   n = 117   =>  117  // db
 *     - Step 2: O(n)   =>   n =  28   =>   28  // oCounted
 *     - Step 3: O(n)   =>   n =  28   =>   28  // arrCounted
 *     - Step 4: O(n)   =>   n =  28   =>   28  // arrOrdered
 *     - Step 5: O(n)   =>   n =   3   =>    3  // firstThree
 *     - Step 6: O(1)   =>   n =   3   =>    1  // total
 *                                        -----
 *                              TOTAL  ~=  205
 */
