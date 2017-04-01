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

const result =
  _.orderBy( //order results by sold's quantity  in desc order
    _.mapValues( //map over hat groups and return the numbers of hats sold
      _.groupBy( //group the hat list by hat ID
        _.reduce(database, (acc, user) => acc.concat(user.hats), []), //get all the hats bought from the data set
        'id'),
      group => ({ sold: group.length })), ['sold'], ['desc'])
  .slice(0, 3) //get the top 3;


const total = result.reduce((subtotal, hat) => subtotal + hat.sold, 0);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');


console.log(`
  Computational complexity in O() notation of time and space

    Solutions steps:
      * reduce -> O(A) -> A (Size of User's records) generates B(Size of Hat's records) 
      * groupBy -> O(B) -> B generates C(Size of grouped records by hat id)
      * mapValues -> O(C)
      * orderBy -> O(C)
      * slice -> O(1) -> generates D (size of chunked records) 
      * reduce -> O(D) 

      TOTAL: O(A * B * C * D) + O(1) = O(N + 1) = O(N);

      The max amount of time and space that will be take to perform
      the analysis is directly proportional to the size of the initial data,
      this is because we need to map over the set and take a property of every record.

      thus, the complexity of time and space is O(N)
`);