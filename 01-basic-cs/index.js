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

const _ = require('underscore');
const assert = require('assert');

const database = require('./database.json');
var a = performance.now();
var array=[];
_.each(_.pluck(_.filter(database, function(user){ return user.hats.length!=0; }),"hats"),function(hats){
	_.each(hats,function(hat){
		array.push(hat);
	});
});//This gets me all sold hats in one array

const total =_.reduce(_.sortBy(_.countBy(array,"id"),function(num){ return -num;}).slice(0,3), function(memo, num){ return memo + num; }, 0);
//This allows me to count the sells of every different hat, rank them from top sold to less sold and sum the three top sold.
var b =performance.now();
console.log(a+" "+b);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
