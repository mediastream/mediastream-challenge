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

const _ = require('lodash')
const data = require('./database.json')
var total = 0
var topSales = []



// const topHats = data.splice(0,3)
_.each(data, (item) => {
	console.log()
	const hats = item.hats
	_.each(hats, (hat) => {
		const hatIndex = _.findIndex(topSales, (i) => { return i.hatId == hat.id } )
		if(hatIndex >= 0) topSales[hatIndex].total += Number(hat.price)
		else  topSales.push({hatId: hat.id, total: Number(hat.price)})
	})
})
topSales.sort((a, b) => {
	if( b.total < a.total ) return -1
	if( b.total > a.total ) return 1
	return 0
})

topSales = topSales.splice(0,3)
console.log('HATS:', "\t\t\t\t\t", 'SUB-TOTAL' )
console.log("_____________________________________________________")
_.each(topSales, (sale) => {
	console.log(sale.hatId, "\t", sale.total )
	total += sale.total
})
console.log("_____________________________________________________")
console.log("\t\t\t\t", 'TOTAL', "\t", total)

console.log('Success!');
