'use strict'

const assert = require('assert')

const database = require('./database.json')

const hatsSold = {}

database.forEach(item => {
  if (item.hats.length) {
    item.hats.forEach(hat => {
      if (hatsSold[hat.id] === undefined) {
        hatsSold[hat.id] = 1
      } else {
        hatsSold[hat.id] += 1
      }
    })
  }
})

const hatSells = Object.values(hatsSold)
hatSells.sort((a, b) => a - b)
const topThreeSellersSum = hatSells.slice(-3)
  .reduce((total, value) => (total += value))

// Throws error on failure
assert.equal(topThreeSellersSum, 23,
  `Invalid result: ${topThreeSellersSum} != 23`)

// Time and space complexity in O() notation is:
//
// - time complexity:
// Extraction (building hatsSold) has O(n^2)
// Sorting complexity depends on Nodejs implementation, but I found that
// Chrome V8 engine uses Timsort algorithm which is a mix of Merge Sort
// O(n log(n)) and Insertion Sort O(n^2), so worst case would be O(n^2)
// Then total time complexity is O(n^2) + O(n^2), which means it's
// O(n^2)
//
// I guess this solution could be improved by using a sorted structure.
// If I have time after finishing next challenges, I'll come back to this one
//
// - space complexity: O(n)
