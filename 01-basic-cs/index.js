'use strict';

// console.log(`
// 1.
// ---

// There is database of users and their hats at './database.json'.
// Find the total sum of the top-3 most selling hats.
// We don't care which hats are.
// You can use lodash/underscore (recommended)

// What is the complexity in O() notation of time and space?

// IMPORTANT: Find a balance between performance and legibility (more important).

// ---
// Example:
// Imagine the following (taken from the real database):

// Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
// Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
// Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
// Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

// -> Expected result: 7 + 7 + 9 => 23
// `);

const sortBy = require('lodash/sortBy');// import individual function instead of full library
const assert = require('assert');

const database = require('./database.json');

let total = 0

const hatsVolume = {}

// extract hats to a separate obj
database.forEach(client => {
  if (client.hats.length === 0) return null // client does not have any hats
  client.hats.forEach(hat => {
    const propToinsert = hatsVolume[hat.id]
      ? { id: hat.id, volume: hatsVolume[hat.id].volume + 1 }
      : { id: hat.id, volume: 1 }
    hatsVolume[hat.id] = propToinsert
    return
  })
})
//turn the obj into an array and sort it
const hatsVolumeValues = Object.values(hatsVolume)
const sorted = sortBy(hatsVolumeValues, 'volume')

// sum last 3 elements
const L = sorted.length
for (let i = L - 1; i > L - 4; i--) {
  total += sorted[i].volume
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('time complexity O(n2) space complexity O(n)')
console.log('Success!');
