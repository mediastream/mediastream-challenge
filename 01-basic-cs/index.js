'use strict';
var colors = require('colors')
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
const TopHats = require('./answer');

const total = new TopHats(database,_).sellsTopSellingHats(3);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!'.yellow);

console.log(`
- What is the complexity in O() notation of time and space?
To answer the complexy I need to deep dive into lodash implementation for functions (flatMap, groupBy, sortBy and sumBy).
Sorry guys, if I'm not considering the lodash functions complexity, probabily my time ran out or just forgot to come back here :/

Steps:
-------
Where 
  n = number of hats owners (length of database array)
  m = number of hats sold (considering all owners)
  k = number of hat models

1. var allHats = _.flatMap(database, (seller) => seller.hats);
   Step complexity: C1(n) where C1 is the complexity of _.flatMap function
2. var groupedHats = _.groupBy(allHats, 'id');
   Step complexity: C2(m) where C2 is the complexity of _.groupBy function
3. var topHats = _.sortBy(groupedHats, (group) => group.length*-1)
   Step complexity: C3(k) where C3 is the complexity of _.sortBy
4.                .slice(0, limit);
   Step complexity: O(limit) = O(3)
5. return _.sumBy(topHats, (group) => group.length);
   Step complexity: C4(3) where C4 is the complexity of _.sumBy

-- Result: C1(n) + C2(m) + C3(k) + O(3) + C4(3)
   Final result: C1(n) + C2(m) + C3(k)

`.yellow)
