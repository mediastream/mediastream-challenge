'use strict';

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

const hats = _.flatMap(database, 'hats');
const countOfHats = _.countBy(hats, 'id');
const mostTopSelling = _(Object.values(countOfHats))
  .sortBy()
  .takeRight(3)
  .value();

const total = _(mostTopSelling).sum();

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
