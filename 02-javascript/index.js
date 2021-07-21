'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- Respuesta: Esta es una función modular que permite hacer diferentes solicitudes a servicios API sin la necesidad de escribir nuevas funciones para cada caso.

- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?
-Respuesta: Modularidad

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

// how it's used?

//Peticion Post
const dataPost = requester('POST', 'https://api.github.com/users/mediastream')
dataPost(['events'], { id: "123456", type: 'Desafio' });

//Petición Get 
const Data = requester('GET', 'https://api.github.com/users/mediastream')
Data(['events']).then((resp) => console.log(resp, resp.length))