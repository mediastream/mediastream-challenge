'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
Retorna una función capaz de realizar llamados a una API de forma modular y parametrizada, que una vez ejecutada
retorna una promesa que resuelve un objeto JSON con la respuesta de la API.


- How it's used? Add different use-case examples that covers every functionality.
// Ejemplo 1, recuperar información
// Ejemplo 2, guardar informacion


- How it is called this design pattern or technique?
Function factory

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

let API_URL = "https://api.github.com/users/mediastream"

/* Recuperar informacion */

const getData = requester("GET", API_URL)

getData(["repos"]).then((resp) => {
  console.log("repos", resp)
})

getData(["following"]).then((resp) => {
  console.log("following", resp)
})

/* Guardar datos */

const postData = requester("POST", API_URL) // Para enviar datos, haría falta que la funcion requester reciba 
// un body, y de tal forma enviar datos como por ejemplo:

postData(["events"], { name: "Nombre del evento" }).then((resp) => {
  // 
})

