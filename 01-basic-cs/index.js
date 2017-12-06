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

// We get all hats sales
let sales = [];
_.forEach(database, function(value) {
	if (typeof value.hats !== 'undefined' && value.hats.length > 0) {
    	sales = _.concat(sales, value.hats);
    }
});

// Calculating the total sales per hat
const hatsSold = _.reduce(sales, function(result, value, key) {
	const index = _.findIndex(result, ['id', value.id]);
	if (index === -1) {
    	result.push({ id: value.id, sold: 1 });
    } else {
    	result[index].sold += 1;
    }
  	return result;
}, []);

// Sorting the hat sales in ascending way, the most sold are at the end
const hatsSoldAscending = _.sortBy(hatsSold, [function(h) { return h.sold; }]);
const total = 
	hatsSoldAscending[hatsSoldAscending.length - 1].sold +
	hatsSoldAscending[hatsSoldAscending.length - 2].sold +
	hatsSoldAscending[hatsSoldAscending.length - 3].sold;

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
