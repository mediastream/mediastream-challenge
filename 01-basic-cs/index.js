'use strict';

// console.log(`
// 1.
// ---

// There is database of users and their hats at './database.json'.
// Find the total sum of the top-3 most selling hats.
// We don't care which hats are.
// You can use lodash/underscore (recommended)

// What is the complexity in O() notation of time and space?

// IMPORTANT: Find a balance between performance and legibility (more important).

// ---
// Example:
// Imagine the following (taken from the real database):

// Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
// Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
// Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
// Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

// -> Expected result: 7 + 7 + 9 => 23
// `);

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');
const database = require('./database.json');

function getSalesObjectById(data) {
	var topSelling = {};
	data.forEach(function(user) {
		if( user.hats.length > 0 ) {
			user.hats.forEach(function(hat) {
				if( topSelling[hat.id] ) {
					topSelling[hat.id] += 1;
				} else {
					topSelling[hat.id] = 1;
				}
			})
		}
	})
	return topSelling;
}

function transformObjectToArray(obj) {
	var array = [];
	for(var key in obj) {
		array.push([key, obj[key]])
	}
	return array;
}

function getTopSellingHats(hats) {
	var hatsById = getSalesObjectById(hats);
	var hatsArray = transformObjectToArray(hatsById);
	var orderedBySale = hatsArray.sort(function(a, b) {
		return b[1] - a[1];
	})

	return orderedBySale.slice(0, 3);
}

function sumHatsTuples(array, position) {
	return array.reduce(function(total, current) {
		total += current[position];
		return total
	}, 0)
}

const topSelling = getTopSellingHats(database);
const total = sumHatsTuples(topSelling, 1) // TODO
// Time complexity for this is O(n^5) given the amount of iteration functions


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
