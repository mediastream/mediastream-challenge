'use strict';

/*console.log(`
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
`);*/

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

//nunca he usado lodash por lo que omito la librería.

var vendidos=[];//guardo items vendidos, cantidad y total venta
var orden=[];//el orden 

//para diferenciar los items tomo como indices del array vendidos, el nombre del sombrero y el material
//vendidos[nombre-material]={cant:n,sum:y}
database.forEach(function(item,index){//por cada registro encontradoi
	if(item.hats.length>0){//solo si hay ventas se procesa
		//por cada venta
		item.hats.forEach(function(itemh,indexh){
			//si el objeto vendidos[nombre-material] existe entonces quierede decir que es el mismo sombrero
			if (typeof vendidos[itemh.name+"-"+itemh.material] != 'undefined') {
				vendidos[itemh.name+"-"+itemh.material].cant++;//incremento el numero de sombrerors vendidos
				vendidos[itemh.name+"-"+itemh.material].sum+=Number(itemh.price);//sumo el valor de venta al total de ventas de ese sombrero
			}
			else{//el objeto para ese sombrero no existe, lo creo.
				vendidos[itemh.name+"-"+itemh.material]={cant:1,sum:Number(itemh.price)};//inicia con 1 cantidad y el vallor de venta
			}
		});
	}	
});
//una vez se obtienen las ventas por sombrero, los ingreso en un array
Object.keys(vendidos).forEach(function(index){
	orden.push(vendidos[index]);
});
//lo ordeno según el numero de items vendidos
var orden_venta=orden.sort(function(a,b){
	return b.cant-a.cant;
});
//orden_venta tiene los sombrerors vendidos ordenados descendente por numero de items vendidos
const total=orden_venta[0].sum+orden_venta[1].sum+orden_venta[2].sum;//sumo las ventas de los tres primeros


// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
