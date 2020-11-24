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

let total = 0 // TODO

let hats = new Map();

database.forEach(user => {
    if (user.hats !== undefined) {
        user.hats.forEach(hat => {
            const tmp = hats.get(hat.id);
            if (tmp === undefined) {
                hats.set(hat.id, 1);
            } else {
                hats.set(hat.id, tmp + 1);
            }
        });
    }
});

let n = 3;

while(n > 0) {
    const result = [...hats.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
    console.log(result);
    n--;
    total += result[1];
    hats.delete(result[0]);
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

/**
 * What is the complexity in O() notation of time and space?
 * IMPORTANT: Find a balance between performance and legibility (more important).
 * 
 * I have no beautiful answer about these question as I have no so deep knownladge about the computer science.
 * But I can get the correct result with my skills, of course, I am focusing on the optimization and quality
 * of my script.
 * Thank you for your time.
 */
