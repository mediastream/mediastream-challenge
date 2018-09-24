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
 

let onlyHats = _.map(database, 'hats');
/* get only hats */


onlyHats = _.flatten(onlyHats); 

/* remove all level array and convert in one level */

let groupbyId = _.countBy(onlyHats, 'id');
/*shows the amount of hat with the same id, a group by*/

groupbyId = _.orderBy(groupbyId, [], ['desc']);
/* get just count and sort from highest to lowest */


/* add the 3 best selling hat */
let result = 0;
for (let i = 0; i < 3; i++) {
    result += groupbyId[i];
}
/* result = 23*/ 
console.log(result);

// Throws error on failure
assert.equal(result, 23, `Invalid result: ${result} != 23`);

console.log('Success!');
