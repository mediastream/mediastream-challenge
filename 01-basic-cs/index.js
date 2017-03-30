'use strict';


const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');


var total = 0 // TODO

//filtramos a los usuario que tengan gorros
var users = _.filter(database, function(o) { return o.hats.length > 0; });

//retorna el numero de ventas por usuario
function Hat( id ){
	
	var sold = 0;

	_.forEach(users, function(o) {

		_.forEach(o.hats, function( hat ) {

			if ( hat.id === id ) sold++;
		});
		
	});

	return sold;
}

//genera la top list de los gorros más vendidos
function topList(n){

	var list = [];

	_.forEach(users, function(o) {

		_.forEach(o.hats, function( hat ) {

			list.push( { id: hat.id, sold: Hat(hat.id) } );
		});
		
	});

	var orderList = _.orderBy( list, ['sold','id'], ['desc','desc']);
	var groupByList = _.groupBy( orderList, 'id');

	var outList = [];

	_.forEach(groupByList, function( o ) {

			outList.push( o );
	});

	return outList.slice(0,n);
}

//suma las ventas
function sumTopList(list){

	var sum = 0;

	_.forEach(list, function( o ) {

		sum = sum + o.length
	});

	return sum;
}

total = sumTopList( topList(3) );

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');

