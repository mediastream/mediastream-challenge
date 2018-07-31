'use strict';

const _ = require('lodash');
const assert = require('assert');
const database = require('./database.json');
const soldHats = [];


for (const customerNth in database) {
    for (const hatNth in database[customerNth].hats) {
        const hat = database[customerNth].hats[hatNth];
        soldHats[hat.id] = soldHats[hat.id] ? ++soldHats[hat.id] : 1;
    }
}


const sales = _.fromPairs(_.sortBy(_.toPairs(soldHats), 1).reverse()); //stackoverflow/a/41875802
const total = sales[Object.keys(sales)[0]] +sales[Object.keys(sales)[1]] +sales[Object.keys(sales)[2]];


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);
console.log('Success, of course.');
