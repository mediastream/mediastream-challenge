'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// First I get all hats in one array
const hats = _.map(database, 'hats').flat()
// Second I group by id the hats by id
// finally I take 3 hats (the first) and I sum it
const hatsGroupById = _.chain(hats).groupBy('id').toArray()
// then I order desc the array by length (quantity of the hats sold)
const hatsSortByLength = hatsGroupById.orderBy(hat => hat.length, 'desc')
// Take most sold and map new array with only quantity of sold
const threeMostSold = hatsSortByLength.take(3).map(hat => hat.length)

const total = threeMostSold.sum().value()
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n2)
 *   - space complexity: O(n)
 */
