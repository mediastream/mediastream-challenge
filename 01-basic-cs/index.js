'use strict'

//const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let total = 0
const totalRowsToSum = 3

let arrayGroup = []

//array = [{ id : 'xxxxxxxxx', count : 10 }]
function getGroupedArray (database) {
  const arr = []
  for (let i = 0; i < database.length; i++) {
    const hats = database[i].hats
    for (let j = 0; j < hats.length; j++) {
      const hat = hats[j]
      const index = arr.findIndex(x => x.id === hat.id);
      (index === -1) ? arr.push({ id: hat.id, count: 1 }) : arr[index].count++
    }
  }
  return arr
}

function reverseInsertionSort (arr) {
  for (let i = arr.length - 2; i >= 0; i--) {
    const value = arr[i]
    let j
    for (j = i; ((j < arr.length) && (arr[j + 1].count > value.count)); j++) {
      arr[j] = arr[j + 1]
    }
    arr[j] = value
  }
  return arr
}

arrayGroup = getGroupedArray(database)

arrayGroup = reverseInsertionSort(arrayGroup)
//other way
//const arrayGroup = arrayGroup.sort((a, b) => b.count - a.count)

for (let index = 0; index < totalRowsToSum; index++) {
  total = total + arrayGroup[index].count
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
