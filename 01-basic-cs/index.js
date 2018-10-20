'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?
    It's a methos to describe the performance or complexity of an algorithm. 
    The time  it take the computer in process the information and the space of memory define the number of complexity in the worst case.


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
var arrayOfHats=[];


function addToArray(hat){
    var found = arrayOfHats.some(function (el) {
        if(el.id===hat.id){
            el.number++;
        }
        return el.id === hat.id;
      });
      if (!found) { arrayOfHats.push({ id: hat.id, number:1 }); }
}

function getNumbOfHats(){
    let total=0;
    database.forEach( (valor)=>{ //recorre la base de datos
        if(valor.hats.length>0){ //recorre cada sombrero si es que el cliente compro al menos uno
            valor.hats.forEach((val)=>{
                addToArray(val)
            })
        }
    });
    arrayOfHats.sort((a, b) =>  parseFloat(b.number)-parseFloat(a.number) ); //ordena el array por number de manera invertida
    arrayOfHats = arrayOfHats.slice(0, 3); //recorta el arreglo de hats a solo 3
    arrayOfHats.forEach((value)=>{
        total+=value.number
    })
    return total;
}

const total = getNumbOfHats();




// TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
