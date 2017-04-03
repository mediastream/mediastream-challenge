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
var topH = {};

var total = 0 // TODO

//lodash recursivo
_.map(database).map(function(x) {
	_.map(x["hats"]).map(function(h){
							if(typeof(topH[h["id"]]) == 'object'){
							   topH[h["id"]]["contador"]++
							}else{
							   topH[h["id"]] = { "contador": 1};
							}
						}
					)
	});

var sorted = _.sortBy(topH, "contador");
_.reverse(sorted);

total = sorted[0]["contador"] + sorted[1]["contador"] + sorted [2]["contador"];
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
