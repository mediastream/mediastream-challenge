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


let total = 0 


let hats = []; // agrupamiento tempral de hats
let hats_ids = []; // conservar los IDs de los hats
let hats_object = []; // array de hats
let ordered_hats = []; // array ordenado de hats

// clasificar y contar los hats
_.forEach( database, function( itm_ ) {
    _.forEach( itm_.hats, function( hat ) {
        if( hats[hat.id] ) {
            hats[hat.id].counter += 1;
        }
        else {
            hats[hat.id] = { id : hat.id ,name : hat.name , counter : 1 };
            hats_ids.push( hat.id );
        }
    } );
});

// poner los hats clasificados en un array indexado
_.forEach( hats_ids, function( hat_id_ ) {
    hats_object.push(hats[ hat_id_ ]);
})

// ordenar array por mas vendidos
ordered_hats = _.orderBy( hats_object, ['counter'], ['desc'] );

// tomar top 3
_.times(3, function(i){
    total += ordered_hats[i].counter;
    console.log('Hat: ' + ordered_hats[i].name + ' total sold: ' + ordered_hats[i].counter );
});



// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
