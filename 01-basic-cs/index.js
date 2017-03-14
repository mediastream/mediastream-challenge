'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?
	Time complexity:
		array access: O(1)
		push elements in the array: O(n)
		read elements from hash table: N/A, I supposed is the same as array time complexity

	Space complexity:
		array access O(n)
		push elements in the array O(n)
		read elements from hash table: N/A, I supposed is the same as array time complexity O(n)
		
	, in this algorith we will not search, just sorting
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


var total = 0 // TODO




var hats_id = [];
var hats_totals = {};
var hats_count = [];
var db_lgt = database.length;
for(var i =0; i < db_lgt; i++) // Looping the database objects
{
	// inside the DB objects get the subobject contain the hats sold.
	for(var hat = 0; hat < database[i].hats.length; hat++) // 
	{
		hats_id.push(database[i].hats[hat].id);
	}
}

hats_id.forEach(function(i, v){ hats_totals[i] = (hats_totals[i] || 0) + 1; });
for(i in hats_totals)
{
	hats_count.push({"id": i, "count":hats_totals[i]});
}

// Sorting descending
hats_count.sort(function(a, b){return b.count - a.count });
for(i in hats_count)
{
	console.log("Hat(" + hats_count[i].id + ") sold " + hats_count[i].count);
	total += hats_count[i].count;
	if(i == 2) break; // Only we need the three first elements most sold
}
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!');
