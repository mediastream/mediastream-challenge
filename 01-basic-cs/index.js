'use strict';

/*console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

Número de usuarios = N. Número de sombreros de cada usuario = M
El sort sobre el arreglo values tal vez sea O(N log N), pero en caso de que sea O(N^2), el algoritmo
seguiría siendo O(N^2).

Orden de tiempo: O(N) * O(M) = O(N^2)
Orden de espacio:

IMPORTANT: Find a balance between performance and legibility (more important).

---
Example:
Imagine the following (taken from the real database):

Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

-> Expected result: 7 + 7 + 9 => 23
`);*/

const assert = require('assert');

const database = require('./database.json');

const hats = [], values = [];

database.forEach(user => {
	user.hats.forEach(hat => {
		if(hats[hat.id]) {
			hats[hat.id] += 1;
		} else {
			hats[hat.id] = 1;
		}
	});
});

for(let key in hats) {
	values.push(hats[key]);
}

values.sort();

const length = values.length;

const total = values[length - 1] + values[length - 2] + values[length - 3];

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');