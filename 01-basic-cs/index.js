'use strict'

const _ = require('lodash-contrib') // Using: https://www.npmjs.com/package/lodash-contrib
const assert = require('assert')

// Take the data
const database = require('./database.json')

// Initialize the array of hats
const hats = []

// For each hat founded, we save in hat's array
_.forEach(database, function (value) {
  _.forEach(value.hats, function (hat) {
    hats.push(hat)
  })
})

// Take the frequencies of each hat founded in the array and ordered from the most to the less frequent
const mostSelledHats = _.reverse(_.orderBy(_.frequencies(_.map(hats, 'name'))))

// Sume the first three values of the array
const total = mostSelledHats[0] + mostSelledHats[1] + mostSelledHats[2]

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)
console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
