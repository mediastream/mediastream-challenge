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

let total = 0; // TODO

/* What is the complexity in O() notation of time and space?
   
   At minimum, this represents an array complexity sceneraio, therefore, at least we need to go through the array once
   being the BigO notation for this O(n);
   But, as we have a nested array for each registry, inmediately this becomes O(Log(n)), 
   As the subsecuent iterations will never be larger than the first one and gradually smaller. 
   The simplest strategy I could think of, is to count the occurrences for every hat in the list and create a frecuency map,
   then sort the map and count the first 3 results. 

*/

// First Step - O(n) Iterate through all records and state manage the increment of the hats.

// 1 - I have creatred an ocurrencesArray to store all the hats occurrences in the array
// This has a O(n) complexity, as at least we will go to every record once.
// The complexity to find the index object is overall ignored, as will never be anyways larger than the amount of items in the list.
const ocurrencesArray = [];

database.forEach(customer => {
  customer.hats.forEach(hat => {
    ocurrencesArray.push(hat.id);
  });
});

//Complexity : O(n + 1);

// 2 - I have implemented a simple occurrence algorithm
const occurrence = function(array) {
  var result = {};
  if (array instanceof Array) {
    array.forEach(function(hatIdx, i) {
      if (!result[hatIdx]) {
        result[hatIdx] = [i];
      } else {
        result[hatIdx].push(i);
      }
    });
    Object.keys(result).forEach(function(hatIdx) {
      result[hatIdx] = { hatIdx: hatIdx, ventas: result[hatIdx].length };
    });
  }
  return result;
};
//Complexity : O(2n);

const frecuencyMap = occurrence(ocurrencesArray);

// 3 - Now I need to sort the frecuency object to get the top 3.
// To do this, I could implement bubblesort, the only algorithm I remember from memory.
// Bubble Sort is easy to develop, Bubble sort compares two adjacent numbers next to each other, then swapping their places if smaller index is larger.
// but iut has a O(n squared) time/space complexity
// But, as I do not have enough time I will implemnernt the Loadash, orderBy sorting algorithm.
/*
    function bubbleSort(occurrencesArray){
      let len = occurrencesArray.length;
      for (var i = len-1; i>=0; i--){
        for(var j = 1; j<=i; j++){
          if(occurrencesArray[j-1]>occurrencesArray[j]){
              var temp = occurrencesArray[j-1];
              occurrencesArray[j-1] = occurrencesArray[j];
              occurrencesArray[j] = temp;
          }
        }
      }
      return occurrencesArray;
    }
  */

const orederedArray = _.reverse(_.sortBy(frecuencyMap, o => o.ventas));
console.log('Ordered Array');
console.log(orederedArray);

//Complexity : Unknown from loadash, but I guyess is O(Log(n));

let tmpCount = 0;
for (let i = 0; i < 3; i++) {
  console.log(orederedArray[i]);
  tmpCount += orederedArray[i].ventas;
}

//Complexity O(n), insignificant for the final calculation.

//Total complexity Sum.
//  O(n + 1) + O(2n) +  O(Log(n)) + 3

total = tmpCount;
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

