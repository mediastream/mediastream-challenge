'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

    O() notation resume the complexity in memory and execution time of an algorithm.
    
The big of the following algorithm is:

    O(a+b+c)

When    
    a -> number of users
    b -> number of total hats
    c -> number of unique hats
    
Algorithm

    1. Users must be mapped into hats => a
    2. User hat list must be concatenated => 2a
    3. Hats must be mapped into unique uuids => 2a+b+1
    4. Unique hat uuids must be mapped into hat counts => 2a+2b+c+1
    5. List of count of hats must be ordered => 2a+2b+2c+1
    6. Only 3 first values must be sliced => 2a+2b+2c+2
    7. List of 3 first values must be reduced into a value => 2a+2b+2c+5

If n = O(n2) &&
    2n+1 = O(n) 
    2a+2b+2c+5 = O(a+b+c)
    

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


const total = (() => {
    let hats = database.map((user) => user.hats) // Map into hats
        .reduce((acc, cur) => acc.concat(cur), []); // Reduce and concat

    return [... new Set(hats.map((hat) => hat.id))].map((uuid) =>
        hats.filter(hat => hat.id === uuid).length
    ).sort((a, b) => b-a)
        .slice(0, 3)
        .reduce((acc, cur) => acc + cur, 0);
})();

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
