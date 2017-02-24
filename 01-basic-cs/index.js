'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?
O(n) as we are just interating through the objects 3/4 times depending on how you grab three maximums

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


const total = 0 // TODO


//given a database of people and the hats they bought return the total number of the top 3 hats sold.
function findTotal (){
  var person,id,hat;
  var hatsSold=[];
  for (person in database){
    for (hat in database[person].hats){
        hatsSold.push(database[person].hats[hat]);
    }
  }
  var sortedList= _.countBy(hatsSold,"id");

  //total = max3 from sortedList; I was unable to get countBy to give me a sorted array, and ran out of time.
}

findTotal();

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
