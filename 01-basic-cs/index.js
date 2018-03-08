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

const async = require('async');
const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

var total = 0;

var newHats = [];

/*
* async.forEachOf y async.each: permite procesar el volumen de registros dado, de forma paralela, aumentando la velocidad de
* respuesta y la ejecución de las operaciones a realizar registro a registro...
*/
async.forEachOf(database, function(user, index, eachOfcallback) {

  if (user.hats.length !== 0){
    async.each(user.hats, function(hat, eachCallback) {
      newHats.push(hat);
      eachCallback();
    });
  }
  eachOfcallback();

}, function(err) {
    if (err) {
      assert.fail('Ha ocurrido un error al procesar uno de los registros de la Base de Datos, Detalles: ' + err);
    } else {
        console.log('Procesamiento en paralelo: OK');
        console.log();

        var nonDuplidatedData = _.uniqBy(newHats, 'id');

        console.log('Total de Gorros: ' + newHats.length);
        console.log('Total de Gorros no Duplicados: ' + nonDuplidatedData.length);
        console.log();

        var gorrosVendidos = _.chain(_.countBy(newHats, 'id'))
          .map(function (itemCount, idHat) {
            return {idHat: idHat, vendidos: itemCount}
          })
          .sortBy(function (zipped) {
            return -zipped.vendidos
          })
          .take(3)
          .value()

        console.log('Selección de las 3 mayores ventas realizadas:');
        console.log(gorrosVendidos);
        console.log();

        total = _.sumBy(gorrosVendidos, 'vendidos')
        console.log('TOTAL DE VENTAS CALCULADA: ' + total)
    }

});

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
