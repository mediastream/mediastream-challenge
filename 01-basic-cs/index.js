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

class TopThreeSold {
    constructor(database) {
        this.top = [];
        this.data = database;
        this.withHats = this.getUsersWithHatsbought();
    }

    getSumOfTopThree() {
        return _.reduce(this.top, (last, current) => {
            return last + current;
        }, 0)
    }

    getUsersWithHatsbought() {
        return _.filter(this.data, (user) => {
            return user.hats.length;
        });
    }

    countEveryHat(hat, store) {
        const { id } = hat;
        store[id] = (store[id] + 1) || 1;
    }

    getTopThree(hatsAsObject) {
        const valuesSorted = _.sortBy(_.values(hatsAsObject));
        this.top = _.slice(valuesSorted, (valuesSorted.length - 3));
    };

    countHatsById() {
        const counter = _.reduce(this.withHats, (last, current) => {
            const { hats } = current;
            _.each(hats, (hat) => this.countEveryHat(hat, last));
            return last;
        }, {});

        this.getTopThree(counter);
    }
}

const topSold = new TopThreeSold(database);
topSold.countHatsById();
const total = topSold.getSumOfTopThree();

console.log('\x1b[36m%s\x1b[0m', `Done - Total: ${total} :D`);

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

