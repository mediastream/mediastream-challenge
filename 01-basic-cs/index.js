'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

	I'm not absolutely sure of this answer, I've to review the nomenclature for algorithmic complexity, however it is somewhat similar to this:

	f(x) = N*m (N -> users, m -> hats)
								+
	f(x) = n (n -> number of different hats)

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

const hatsIndexed = new Map();

for (const { hats } of database) {
	for (const { id: hat_id } of hats) {
		let value = 1;
		if (hatsIndexed.has(hat_id)) {
			value= hatsIndexed.get(hat_id) + 1;
		}
		hatsIndexed.set(hat_id, value);
	}

}

const topThree = [0, 0, 0];

for (const [ id, value ] of hatsIndexed) {
	let index;
	if (value > topThree[0]) {
		index = 0
	} else if (value > topThree[1]) {
		index = 1
	} else if (value > topThree[2]) {
		index = 2
	} else {
		index = null;
	}
	if (!_.isNull(index)) {
		topThree.splice(index, 0, value);
		topThree.pop();
	}
}

const total = topThree[0] + topThree[1] + topThree[2];

	// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
