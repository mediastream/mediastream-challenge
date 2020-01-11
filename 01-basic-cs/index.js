'use strict';

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

function Hat(este) {
    let total=0
    let result = null;
    database.some( e => {
        if(typeof e.hats !== 'undefined' && e.hats.length > 0 )      
        { 
            e.hats.forEach(element => {
                if(element.id===este){
                total = total + 1;
                }
            });
        }
    })
    return result=total;
  }

const find=( ()=>{
    const arreglo=[]
    arreglo.push(Hat('7adbc650-2a5e-4e59-b88f-97377e0b7e34'))
    arreglo.push(Hat('872f5fc4-515f-416d-9ec6-3488da2bd74a'))
    arreglo.push(Hat('048d8fbf-7653-461f-a59c-68c73b8855e5'))
    arreglo.push(Hat('32266d28-5092-4a69-afb3-90fafd46e04a'))
    const ordenado=arreglo.sort(function (a, b){
        return b - a;
    })
    return ordenado[0]+ordenado[1]+ordenado[2]
})

const total= find()
console.log(total)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
