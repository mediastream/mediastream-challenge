'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

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

const total = sumOfTopMostSellingHats(database, 3)

console.log(`
  - The complexity of the algorithm in terms of time is O(n) where n is the number
    of hats stored in database.
  - The complexity of the algorithm in terms of space is O(n) + O(2m) where n is
    the number of hats stored in database and m is the number of hats grouped by id.
`)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

function sumOfTopMostSellingHats(users, top) {
  const hatsAndQuantity = users.reduce((result, user) => {
    if(user.hats && user.hats.length > 0) {
      user.hats.forEach(hat => {
        result[hat.id] = (result[hat.id] || 0) + 1
      })
    }
    return result
  }, {})
  const orderedQuantities = _.orderBy(hatsAndQuantity, [], ['desc'])
  let result = 0
  for(let i = 0, len = (top % orderedQuantities.length); i < len; i++) {
    result += orderedQuantities[i]
  }
  return result
}
