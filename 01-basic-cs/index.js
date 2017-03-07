'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
Find the total of people that not bought any hat.
Find the name of the less sold hat.
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

At the end please describe how did you get to the answer with details?
Example: 
I knew it before the test.
or
I found it in stack overflow
`);

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

var noHats = 0;
var hatsObj = [];
_.forEach(database, function(collection){
    if (collection.hats.length === 0){
        noHats++;
    } else {
        hatsObj.push(_.map(collection.hats, 'name'));
    }
});

var countArray =  _.countBy(_.flatten(hatsObj));
var orderedArray =_.sortBy(countArray).reverse();
var total = _.sum(_.take(orderedArray, 3));
var lessSold = _.head(Object.keys(countArray).sort(function(a,b){return countArray[a]-countArray[b]}));

console.log('hats: ', total);
console.log('noHats: ', noHats);
console.log('lessSold: ', lessSold);

const totalTop3 = total;
const lessSoldHat = lessSold;
const totalNoHats = noHats;

// Throws error on failure
assert.equal(total, 23, 'Invalid result: ${total} != 23');

console.log('Success!');

console.log(
    `    Lo primero que hice fue recorrer los resultados y buscar el atributo deseado, en este caso
    era el array de objetos "hats". La tarea de contar cuántos clientes no compraron sombreros se resuelve
    simplemente validando que el lenght del array "hats" sea igual a 0, es decir que no posee ningún elemento.

    Al mismo tiempo que se recorre el array, en caso de tener la venta de algún sombrero, almaceno el nomnbre
    de todos los sombreros adquiridos por ese cliente en un array de arrays. Una vez concluido el recorrido,
    simplifico el array de arrays a un array de una dimension y se procede a contar cuantas veces ocurren las
    repeticiones de los nombres de los sombreros. Esto me dá como resultado la cantidad de veces que fue
    comprado cada sombrero.

    Para obtener el total de los top 3 adquiridos, ordeno el objeto con las cantidades de manera descendente y solo
    se toman los 3 primeros valores; luego estos son sumados y este es el resultado de dicho total.
    Para obtener el nomnre del sombrero menos vendido, Ordeno el objeto en base a sus cantidades de manera ascendente
    y tomo el primer valor del arreglo devuelto.

    Algunas fuentes consultadas:

    https://lodash.com/docs
    http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value

    En respuesta a la pregunta sobre la complejidad de la notación O(). La misma se basa en 2 aspectos fundamentales
    El Primer factor a mencionar es el tiempo que los algoritmos toman en resolver una determinada funcionalidad. Se
    han registrado algunas ecuaciones que demarcan algunas variables y constantes para medir el tiempo que tardan
    dichos algoritmos en cumplir una subrutina. Sin embargo el problema reside en que algunas de las ecuaciones determinadas
    para ciertos algoritmos, demuestran que el tiempo de espera incremente exponencialmente en base a la cantidad de data
    que se tenga que procesar; esto hace que mientras mayor sea la data a procesar mayor sera el tiempo de espera para obtener
    resultados.

    Por otra parte, el segundo factor a mencionar es el espacio. Este se ve reflejado como la cantidad de espacio físico (o
    memoria por decirlo de alguna manera) que los algoritmos utilizan para procesar las subrutinas. No obstante este factor
    no parece ser tan crítico si consideramos el hecho de que cada vez se incrementan más los recursos fisicos otorgados
    para el procesamiento. Sin embargo un algoritmo no optimizado podría consumir demasiados recursos y no develver los
    resultados esperados.

    Algunas fuentes consultadas:

    http://www.leda-tutorial.org/en/official/ch02s02s03.html
    http://bigocheatsheet.com/`);