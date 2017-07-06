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


// Solution:
// - Loop the users, then loop the hats.
// - By every unique hat sum 1
// - Sort descendant
// - Sum top 3

// It takes:
// Time: O(m*n)
// Space: O(n)
// where m -> number of users and n-> number of hats

var top_selling = {};

_.forEach(database, function(user){
    _.forEach(user.hats, function(hat){
        if (_.has(top_selling, hat.id)){
            ++top_selling[hat.id];
        }
        else{
            top_selling[hat.id] = 1;
        }
    });
});

const total = _.chain(top_selling)
    .sortBy()
    .takeRight(3)
    .sum();


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
