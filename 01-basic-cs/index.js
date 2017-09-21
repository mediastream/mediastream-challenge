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

/**
 * The index of hats. Each element is an object that contains a 'sales' key
 * that holds the total of sales made of this hat. Useful for sorting
 * @type Object
 */
const hats = {};

_.each(database, user => {
  _.each(user.hats, hat => {
    // We need to initialize each object before suming
    if (!_.has(hats, hat.id)) {
      hats[hat.id] = { sales: 1 };
      return;
    }

    hats[hat.id].sales += 1;
  });
});

/**
 * The desc order of hats
 * @type Array
 */
const orderedHats = _.orderBy(hats, ['sales'], ['desc']);

/**
 * The total sum of result
 * @type {Number}
 */
let total = 0;

/**
 * Gets the first three hats and the sum of these
 * @param  Integer let i
 * @return Void
 */
for (let i = 0; i < 3; i++) {
  total += orderedHats[i].sales;
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('This code has complexity of O(3n)');
console.log('Success!');
