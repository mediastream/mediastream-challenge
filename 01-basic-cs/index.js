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

// retorna un arreglo con las cantidades de los top-3 sombreros más vendidos
function topThreeSold(callback) {
	var hatsArray = [];
	_.forEach(database, function (element) {
		_.forEach(element.hats, function (hat) {
			hatsArray.push(hat.id);
		});
	});
	callback(_.takeRight(_.orderBy(_.countBy(hatsArray), [], ['asc', 'desc']), 3));
}

// al obtener los sobreros se muestra el resultado por pantalla
topThreeSold(function (result) {
	console.log("result: " + result[0] + " + " + result[1] + " + " + result[2]
		+ " => " + (result[0] + result[1] + result[2])
	);
});

console.log(`
La función "topThreeSold" se realiza con callback para no bloquear el programa. Su complejidad
en tiempo es O(n^2) que viene dada por los ciclos anidados "forEach", los filtros en el array son O(n)
por lo que no cuentan. La complejidad en espacio es de O(n+m), siendo n el espacio que ocupa
"database" y m el espacio que ocupa "hatsArray", a lo que se debe sumar el espacio del proceso
de filtrado que será inferior a m;

topThreeSold:
	1.- Se extraen los sobmbreros de la base de datos y se mapean sus id's a un arreglo
	2.- El arreglo se filtra en el siguiente orden: contar > ordenar > extraer top-3
`);