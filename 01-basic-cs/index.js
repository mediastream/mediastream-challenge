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

console.log(`
Respuesta:
Para desarollar este ejercicio se empleo la libreria lodash para la carga de datos y se emplea forEach para
recorrer los elementos contenidos en el Array, posterior a ello se emplea una coleccion de Hats en un nuevo
arreglo con el fin de obtener los registros totales pero identificando cada sombrero, si no existe,
se ingresa en el listado como nuevo registro, caso contrario se suma +1 al contador.

Por ultimo se realiza un ordenamiento simple por value (contador) para sumar los 3 Hants mas vendidos.

La complejidad completa de este algoritmos es O(n) = n * (h + 1(a) + H * (3(b) + 3(c)) + 3(d) + 10(e))
con esta formula se calcula el numero aproximado de cantidad de operaciones que realiza el algoritmo,
siempre pensando en el peor caso.  

Donde:
n = cantidad de personas
h = cantidad de sombreros de la persona
H = cantidad de sombreros recolectados
(a) = Asignacion de exist = false
(b) = Consulta de hat.id === row.id
      1 operacion traer hat.id
      1 operacion traer row.id
      1 operacion verificar hat.id === row.id
(c) = Asignacion de exist = true; row.value++;
      1 operacion exist = true;
      1 operacion traer row.value
      1 operacion asignar y sumar +1
(d) = Consulta de !exist
      1 operacion traer exist
      1 operacion negar exist
      1 operacion verificar exist
(e) = Asignacion del objeto
      2 operaciones id: hat.id
      2 operaciones material: hat.material
      2 operaciones name: hat.name
      2 operaciones price: hat.price
      1 operacion value: 1
      1 operacion de asignacion del objeto completo

Respecto al balance entre Rerformance y Legibility es analizada directamente con test
de cobertura del lenguaje de programacion propiamente tal, esto es, analizar en detalle
el alcance de los metodos que entrega el lenguaje (en nuestro caso Javascript con el motor V8
para NodeJS), y analizados estos valores, ver que tanto impacto existe con el estilo
de programacion que puede segun Frameworks, librerias y otros incrementar un par de
instrucciones adicionales al algoritmo, pero haciendo mas legible las instrucciones.
`);

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');

// TODO
let counter = 0, exist, hats = [], total = 0;

_(database).forEach((row) => {
    row.hats.forEach((hat) => {
        exist = false
        hats.forEach((row) => {
            if (hat.id === row.id) {
                exist = true;
                row.value++;
            }
        });
        if (!exist) {
            hats.push({
                id: hat.id,
                material: hat.material,
                name: hat.name,
                price: hat.price,
                value: 1
            });
        }
    });
});
hats.sort(function(a, b) {
    return parseFloat(b.value) - parseFloat(a.value);
});
for(counter; counter < 3; counter++) {
    total += hats[counter].value;
}

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');
