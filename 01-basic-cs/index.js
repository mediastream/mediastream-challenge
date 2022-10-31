'use strict'

const assert = require('assert')

const seller = require('./database.json')

let total = 0

const repetidos = []
for (let i = 0; i < seller.length; i++) {
  for (let j = 0; j < seller[i].hats.length; j++) {
    const hut = seller[i].hats[j]
    repetidos[hut.id] = (repetidos[hut.id] || 0) + 1
  }
}

const entries = Object.entries(repetidos)
const sortable = entries.sort((a, b) => b[1] - a[1])
const sumatotal = sortable.splice(0, 3)

console.log('mas vendidos')
console.log(sumatotal)

sumatotal.forEach(element => {
  total += element[1]
})

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
