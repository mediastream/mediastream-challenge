'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hats = _.flatMap(database, 'hats')
const obtainIds = _.countBy(hats, 'id')
const separatePairsIds = _.toPairs(obtainIds)
const orderDesc = _.orderBy(separatePairsIds, ([idHat, count]) => count, 'desc')
const firstThreeElements = orderDesc.slice(0, 3)
const total = _.sumBy(firstThreeElements, ([hatId, count]) => count)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 * With the resolution of the problem, the following is obtained:
    Time complexity: O(n + m log m)
    space complexity: O(n + m), where n is the total number of hats sold and m is the total number of different hats sold.
    Where:
    n: total number of hats sold and
    m: total number of different hats sold.
    therefore:
    n = 117 -> Total hats sold
    m = 28 -> Total number of different hats sold
 */
