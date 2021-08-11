'use strict';

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

var total = 0 // TODO

var hatsCounter = [];
//to keep the score
var first = -1;
var second = -1;
var third = -1;
//to keep the raking ids
var firstId = '';
var secondId = '';
_.forEach(database, function(person){
	_.forEach(person.hats, function(hat){
		if(!hatsCounter[hat.id])
			hatsCounter[hat.id] = 1;
		else
			hatsCounter[hat.id] += 1;
		//we need to rank each sum in order to not iterate over the result sum array
		if(hatsCounter[hat.id] > first){
			if(firstId == hat.id){
				firstId = hat.id;
				first = hatsCounter[hat.id];
			}
			else{
				third = second;
				second = first;
				first = hatsCounter[hat.id];
				firstId = hat.id;
			}
		}
		else if(hatsCounter[hat.id] > second){
			if(secondId == hat.id){
				secondId = hat.id;
				second = hatsCounter[hat.id];
			}
			else{
				third = second;
				second = hatsCounter[hat.id];
				secondId = hat.id;
			}
		}
		else if(hatsCounter[hat.id] > third){
			third = hatsCounter[hat.id];
		}
	});
});
total = first + second + third;
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success! Result BigO = O(n^2)');
