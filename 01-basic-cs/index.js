'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const total = _(database).map((g) => { return g.hats }).flatten()
  .countBy('id').map(function (cnt, idh) {
    return {
      idh: idh,
      count: cnt
    }
  }).orderBy(['count'], ['desc']).take(3).sumBy('count')
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */

// time complexity: O(nlogn) or O(n^2) depending on sort algortihm
// space complexity: O(1) or O(n) depending on sort algortihm
