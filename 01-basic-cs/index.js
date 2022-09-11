'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let hats = {}
function get_three_most_selling_hats(database){
    console.log('length ',database.length)
    for (let index = 0; index < database.length; index++) { // O(n)
        //if I have hats
        let selled_hats = database[index].hats;
        if(selled_hats.length > 0){
            for (let j = 0; j < selled_hats.length; j++) { // O(n)
                
                if(typeof hats[selled_hats[j].id] == 'undefined'){
                    hats[selled_hats[j].id] = 1 //O(1)
                }else{
                    hats[selled_hats[j].id] ++ //O(1)
                }
            }
        }
    }
    let sortable = [];
    for (var vehicle in hats) { // O(n)
        sortable.push([vehicle, hats[vehicle]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable[0][1] + sortable[1][1] + sortable[2][1] ; //O(n^2)
}

const total = get_three_most_selling_hats(database) // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')
console.timeEnd('inicio')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n^2)
 *   - space complexity: O(n^2)
 */
