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

const assert = require('assert');
const database = require('./database.json');
const groupedHatsCount = {}

//console.time("duration");

database.forEach(client => {
  if (client.hats.length > 0)
    client.hats.forEach(hat => {
        const existingHat = groupedHatsCount[hat.id]
        groupedHatsCount[hat.id] = existingHat ? existingHat + 1 : 1
    })
})

const sortedHats = Object.values(groupedHatsCount).sort((a, b) => b-a).slice(0, 3)
let total = 0
for (let i = 0; i<3; i++) //I know that the limit is 3, in another case I should use the sortedHats length in another var
    total += sortedHats[i]
assert.equal(total, 23, `Invalid result: ${total} != 23`);
console.log('complexity time: O(nm), O(nlogn) => Assuming that n is equal to m then O(n2)')
console.log('complexity space: O(n), O(1), O(1) => O(n)')
//console.timeEnd("duration");
// Duration test: 5 times, prom: 0.7926 ms
console.log('Success!');