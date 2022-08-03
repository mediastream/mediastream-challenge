'use strict'

// const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hats = []
database.forEach(data => hats.push(...data.hats))

const countHats = {}
hats.forEach(hat => {
  countHats[hat.id] = !countHats[hat.id] ? 1 : countHats[hat.id] + 1
})

const filteredDataBase = Object.keys(countHats)
  .map(hat => ({ id: hat, times: countHats[hat] }))
  .sort((a, b) => b.times - a.times)
  .slice(0, 3)

let total = 0

filteredDataBase.forEach((hat) => {
  total = total + hat.times
})
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
