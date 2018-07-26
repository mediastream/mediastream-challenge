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

const total = _.reduce( // sum hats count
  _.slice( // get first 3 hats
    _.orderBy( // order desc by hats count 
      _.mapValues( // get hats count per group
        _.groupBy( // group hats by id
          _.reduce(database, (acc, u) => [...acc, ...u.hats], []), // list all the hats
          'id'
        ),
        g => ({hatsCount: g.length})
      ),
      ['hatsCount'], ['desc']
    ),
    0, 3
  ),
  (acc, i) => acc + i.hatsCount, 0
)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

console.log(`
Complexity in O() notation of time and space:

  A: User records

  - reduce:    O(A) => B (Hat records) 
  - groupBy:   O(B) => C (Grouped Hat records by id)
  - mapValues: O(C) => D (Hats Count records)
  - orderBy:   O(D) => E (Ordered Hats Count records)
  - slice:     O(1) -> F (Chunked Ordered Hats Count records) 
  - reduce:    O(F) => G (Sum of chunked ordered hats count records)
 
  complexity: O(A * B * C * D * E * F) + O(1) = O(N + 1) ≈ O(N)
`)
