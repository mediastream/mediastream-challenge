'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

//console.log(database.length);

let hatsCount = {};
let s1 = 0;
let s2 = 0;
let s3 = 0;

let c = 0;
let p = 0;
let arr = [];
_.map(database, (user) => {
    c += user.hats.length;
    p++;
    arr.push(user.hats.length);
    _.map(user.hats, (hat) => {
        hatsCount[hat.id] = hatsCount[hat.id] ?? 0;
        hatsCount[hat.id] = hatsCount[hat.id] + 1;
        if (hatsCount[hat.id] > s1)
            s1 = hatsCount[hat.id];
        else if (hatsCount[hat.id] > s2)
            s2 = hatsCount[hat.id];
        else if (hatsCount[hat.id] > s3)
            s3 = hatsCount[hat.id];

    })
});

const total = s1 + s2 + s3;
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
