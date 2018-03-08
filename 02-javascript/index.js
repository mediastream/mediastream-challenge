'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  R: Este método permite invocar o hacer llamadas HTTP de cualquier tipo de verbo (especificado en el parámetro 'method'),
      la API de Fetch, se encarga de realizar llamadas, entregándonos en todo momento, un payload de salida de la API, o Json de respuesta,
      ya sea con la respuesta satisfactoria del servidor (200) o bien, cualquier tipo de error según respuesta de servidor, o bien por timeOut alcanzado.

- How it's used? Add different use-case examples that covers every functionality.
  R: Se usa de la siguiente manera, dando la posibilidad de consumir Servicios Web REST.
      A continuación se añaden diferentes formas de utilizarlo degún documentación.

- How it is called this design pattern or technique?
  R: Para las Llamadas Fetch: El patrón de diseño o técnica utilizada es llamada como Consumo de API Rest, o Llamadas Asíncronas (Ajax).
  R: Para el método 'requester', el patrón de diseño es una combinación de diferentes técnicas, tales como: Simplificación de condicionales y funciones,
      además de utilizar ternarios para condiciones en una línea.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
const fetch = require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch
const url = "https://api.github.com/users/mediastream";

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

/*
* How it's used? Add different use-case examples that covers every functionality.
* R: Se usa de la siguiente manera, dando la posibilidad de consumir Servicios Web REST.
*  A continuación se añaden diferentes formas de utilizarlo degún documentación.
*/

// Método 1:
requester('GET', url, { 'Accept': "*/*", 'Content-Type': 'application/json' });

// Método 2:
fetch(url)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Response Método 2:');
        console.log(data);
        console.log();
    });

// Método 3:

let dataBody = {};

fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //headers: headers,
    method: "GET",
    body: JSON.stringify(dataBody)
})
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Response Método 3:');
        console.log(data);
        console.log();
    }).catch(function(err) {
        console.log(err);
    });
