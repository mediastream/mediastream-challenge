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

const hats = new Array();
const sales = database.map(record => record.hats.forEach(hat => {
		hats[hat.id] = typeof hats[hat.id] === 'undefined' ? 1 : hats[hat.id] + 1;
	})
);
const results = _.sortBy(_.toPairs(hats), function(a){return a[1]}).reverse();
const top3 = _.take(results, 3);

console.log('Problem solved:')

top3.forEach(top => {
	console.log(`Hat(${top[0]}) sold ${top[1]}`);
	total += top[1];
});

console.log(`
Answer to your big O Notation question:
I am not sure about what this is exactly, but I can tell what is not.
I know this is not O(1) nor O(n) because I have to track n record(s) just to gather hat sales, before knowing which became best sellers.
This is not O(n^2) because after tracking n records once, I have to track m potential sales.
Thus, I could conclude that this problem may be like an O(n*m) for n records and m sales.
However, we have to group by hat id then, which means that we have to traverse n*m results, again.
So, we should have something like (n*m^2) and then get the total number of sales for every single hat.
And then, inform about top3 sales.
I can't figure out how that comes into big O notation.
Anyways, I was never taugth about this at University, so I do not feel that bad :p
`);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

