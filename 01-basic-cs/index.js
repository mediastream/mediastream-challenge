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

// TASK
var hats = {};
var users = database;

// 1 - Group && count Hats First
for(let i=0;i<users.length;i++){

  // Validate
  let user = users[i];
  if( !user.hats.length ) continue;

  // group hats by type
  for(let j=0; j<user.hats.length; j++){
    let hat = user.hats[j];
    let total = hats[hat.id];
    hats[hat.id] = isNaN(total)? 1: ++total;
  }
}

// Generate Array with Total x Each Hat
var totalList = Object.keys(hats).map(function (key) { return hats[key]; });
bubbleSort(totalList);

// Sett Total
const total = totalList[0] + totalList[1] + totalList[2]

console.log(`
    The time and complexity in Space is 0(n^2)
`);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

/**
 * Inverse Bubble Sort
 **/
function bubbleSort(a){
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] < a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
