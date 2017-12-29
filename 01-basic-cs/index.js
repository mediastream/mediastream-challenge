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

// extract the hats
let hatsSold = _.map(database, 'hats');

//convert the array of arrays in one level array
hatsSold = _.flatten(hatsSold); 

//count the elements existents by their id
let hatCounts = _.countBy(hatsSold, 'id');

// i need to orden the results by the total
hatCounts = _.orderBy(hatCounts, [], ['desc']);

//in the future can be different of 3 :)
let topElements = 3;

//Once ordered, i can take the firsts 3 array elements
let total = 0;
for (let i = 0; i < topElements; i++) {
  total += hatCounts[i];
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
