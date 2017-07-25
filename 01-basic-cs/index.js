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

const total = _(database) // Wrap object in lodash object to allow method chaining.
              .map(user => user.hats) // Simple map to get all hats by everyone.
              .flatten() // Merge all hats arrays into one, plus remove any empty ones.
              .countBy('id') // Count all hats of each unique id.
              .sortBy() // Convert into a value-only array, sorted in ascending order.
              .slice(-3) // Get last three, since it's sorted this gets the ones with highest value.
              .sum() // Add them up to get the total.



//  ***** What is the Big-O complexity in time and space? *****
// Since we are chaining the methods, they will execute one after the last one has finished. This means the
// complexity in TIME will be the one of the most complex method used, in this case I would say it's
// the sortBy, since most sorting algorithms are O(N^2). NOTE: 'sortBy' could be replaced with a
// more efficient, solution-specific algorithm, but for sakes of readability, and since there aren't
// that many elements in the array after 'countBy', I think this works best.
// SPACE complexity is O(NM), N being the amount of users, M being the amount of hats.


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
