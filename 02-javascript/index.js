'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

  Crea una función requester() que recibe tres parámetros; El method (post, get), 
  la base: URL y los header (Application/json). Esta función retorna un fetch() que
  nos devuelve la respuesta del parametro base.

- How it's used? Add different use-case examples that covers every functionality.

  Se debe instanciar la función entregando los parametros solicitados

- How it is called this design pattern or technique?

  Isomorphic es un concepto que nos permite correr código del lado del cliente
  en el servidor

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const response = requester('get', 'https://api.github.com/users/mediastream', 'application/json')
response().then((data) => console.log(data))
