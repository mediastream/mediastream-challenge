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

var total = 0 // TODO

const MAX_TOPS = 3;

//for this function is O(users * hats), because the hat which are conting is checked and update in O(1)
function get_hats_sells(database) {
	var hats_sells = {};
	for(var u in database) {
		var hats = database[u].hats;
		for(var h in hats) {
			var hat = hats[h];
			if(!(hat.id in hats_sells)) {
				hats_sells[hat.id] = 0;
			}
			hats_sells[hat.id]++;
		}
	}

	return hats_sells;
}

//for this function is O(hats_sells * MAX_TOPS), but in the best case scenario(the top sells are at the begining) is O(hats_sells + MAX_TOPS)
function get_tops_sells(hats_sells, MAX_TOPS) {
	var tops = [];

	for(var i = 0; i < MAX_TOPS; i++) {
		tops.push(0);
	}

	var min_val_tops = 0;
	var min_pos_tops = 0;

	for(var hat_id in hats_sells) {
		var hat_sells = hats_sells[hat_id];

		//if is greater than the min top we correct the tops and the min top
		if(hat_sells > min_val_tops) {
			tops[min_pos_tops] = hat_sells;
			min_val_tops = hat_sells;

			for(var j = 0; j < MAX_TOPS; j++) {
				if(tops[j] <= min_val_tops) {
					min_val_tops = tops[j];
					min_pos_tops = j;
				}
			}
		}
	}

	return tops;
}

var hats_sells = get_hats_sells(database);
console.log(hats_sells);

var tops_sells = get_tops_sells(hats_sells, MAX_TOPS);
console.log(tops_sells);

for(var t in tops_sells) {
	total += tops_sells[t];
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
