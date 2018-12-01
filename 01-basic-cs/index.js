'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

  O(2^n) - Order 2^n for Users
  O(n) - Order N for Hats
  O(3) - Order 3 for reduce
  O(2^n) + O(n)+ O(3) = O()

IMPORTANT: Find a balance between performance and legibility (more important).

---
Example:
Imagine the following (taken from the real database):

Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

-> Expected result: 7 + 7 + 9 => 23
`);

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

let total = 0 // TODO
let topHats = []

_.forEach(database, user => {
  // verified the user has hats
  if (user.hats.length) {

    //iterate the user's hats
    _.forEach(user.hats, hat => {

      // find if the hat exits on the tmp array
      const existIndex = _.findIndex(topHats, { 'id': hat.id });

      return (existIndex !== -1)
        // if exist acc
        ? topHats[existIndex].count += 1
        // if not push a new one
        : topHats.push({
          id: hat.id,
          count: 1
        })
    })
  }
})

// sort a get the top-3 and return the total
total = topHats.sort((a, b) => b.count - a.count).slice(0, 3).reduce((a, { count }) => a + count, 0);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');














