'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// Combine all users's hats
const allHats = _.flatMap(database, 'hats')

// Obtain the frequency of each hat by its id
const hatsFrequency = _.countBy(allHats, 'id')

// Obtain a ordered array with the frequency of each hat
const orderedHatsByFrequency = _.orderBy(_.toPairs(hatsFrequency), (pair) => pair[1], 'desc')

// Get the first 3 elements
const highers = _.take(orderedHatsByFrequency, 3)

// Sume it
const total = _.sumBy(highers, (el) => el[1])

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(m log m) - m represents the array with the frequency, which is ordered
 *   - space complexity: O(n)
 */
