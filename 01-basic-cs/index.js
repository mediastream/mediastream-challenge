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

let hats = [];

//iterando sobre los filtrados

_.map(_.filter(database, (x) => x.hats.length > 0), (x) => {
    hats = _.concat(hats, x.hats);
});

// Ordenando los sombreros y tomando los tres primeros para sumarlos
const total =  _.sum(_.orderBy(_.countBy(hats, 'id'), null, ['desc']).slice(0,3));

//The total sum of result is the sum of the ordered hats
console.log(`total is ${total}`);


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);
console.log('Success!');
console.log('La complejidad para este algoritmo es Lineal  = 3(n)');
