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


/* Utilizando lodash */

let total = 0 // TODO

console.time('count')
total = _(database)
  .map((item) => item.hats)
  .flatten()// 
  .countBy('id')
  .orderBy([], ['desc'])
  .slice(0, 3)
  .sum()

console.timeEnd('count')

console.time('count')


/* Utilizando el estandar EcmaScript 6^ */
let acumm = database                      //1
        .map((item) => item.hats)         //n
        .flat()                           //n
        .reduce((hatsSold, current) => {
          if(!hatsSold[current.id]){
            hatsSold[current.id] = 1
          } else {
            hatsSold[current.id] ++
          }
          return hatsSold
        },{})                          //n

let totals = Object.values(acumm)      
let top3 = totals.sort((a,b) => b - a) //nlogn
                  .splice(0,3)         //n
total = top3.reduce((a,b)=> a+b)       //n

// Complejidad O(nlogn)
console.timeEnd('count')


// Desconozco la complejidad utilizando las funciones que provee lodash, pero utilizando js vanilla
// con ES6^ la complejidad es de nlog tomando en cuenta que la mayoría de estas funciones de orden superior
// iteran la colección hasta n para realizar cada operación y 'sort' recorre y compara para ordenar con 
// una complejidad de nlogn

// Los resultados respecto al tiempo de ejecución muestran que la segunda implementación es mas eficiente y no
// necesariamente menos legible.


// Throws error on failure
//assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
