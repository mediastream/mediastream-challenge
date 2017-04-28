'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space? 0(2)

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

/**
 * Holds every user and a relation with its hats
 * @type {Array}
 */
const users = require('./database.json');

/**
 * Holds every hat available
 * @type {Collection}
 */
const hats = {};

/**
 * The sample size
 */
const limit = 3;

// Fills the 'hats' variable with it agrupation
_.each(users, user => {
  // We skip this user if doesn't have hats
  const hasHats = !! user.hats.length;
  if (!hasHats) {
    return true;
  }

  _.each(user.hats, hat => {
    // Append the hat to the 'hats' object.
    const exists = _.has(hats, hat.id);

    if (!exists) {
      // We initialize an index for this hat
      hats[hat.id] = {
        size: 1,
      };
      // We don't have anything else to do
      return true;
    }

    // If the hat exists, we just increase its count
    ++hats[hat.id].size;
  });
});


// Turn the hat object into an array
const counts = _.values(hats);

// Sorts and limit the sells array
const total = _(counts)
  .sortBy('size')
  .takeRight(limit)
  .sumBy('size');

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
