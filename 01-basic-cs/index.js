'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let total = 0 // TODO
const getSoldHats = () => {
  const userHats = database.map(user => _.get(user, 'hats'))
  return _.flatten(userHats)
}

const getSoldQtyOfHats = () => {
  const hats = {}
  const soldHats = getSoldHats()
  soldHats.forEach(hat => {
    hats[hat.id] ? hats[hat.id]++ : hats[hat.id] = 1
  })

  return hats
}

const getSortedSoldHats = () => {
  const hats = getSoldQtyOfHats()
  const sortFunction = ([, a], [, b]) => b - a
  const reducer = (r, [k, v]) => ({ ...r, [k]: v })
  const sortedHats = Object.entries(hats).sort(sortFunction).reduce(reducer, {})

  return sortedHats
}

const getSumTopSellingHats = () => {
  const sortedHats = getSortedSoldHats()
  const topThreeHats = Object.values(sortedHats).slice(0, 3)
  total = topThreeHats.reduce((acc, curr) => acc + curr, 0)
}

getSumTopSellingHats()
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
