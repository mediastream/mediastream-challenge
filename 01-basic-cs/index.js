"use strict";

const _ = require("lodash"); // https://lodash.com/docs/4.17.4
const assert = require("assert");

const database = require("./database.json");

const hats = _.map(database, "hats").flat();

const groupedHats = _(_.groupBy(hats, "id"))
  .map((group) => group.length)
  .value();

const sortedHats = _.sortBy(groupedHats).reverse();

const total = _.sumBy(_.take(sortedHats, 3));

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log("Success!");

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
