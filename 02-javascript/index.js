'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

es un mecanismo basado en promesas para poder hacer "peticiones" de manera programada, realiza una peticion a una direccion, una vez conseguida la respuesta devuelve un JSON,
esta en especifico es la implementacion para NodeJS

- How it's used? Add different use-case examples that covers every functionality.

a) para consumir una API.

b) puede ser usado para mantener actualizado una base de datos desde otras fuentes en intervalos definidos.

c) para buscar informacion en especifico en distintos sitios considerando distintos parametros.

d) para mantener actualizado otro sistema anexo o relacionado.

e) para realiar un analisis de la respuesta bajo algun parametro.

- How it is called this design pattern or technique?

es un fech pattern o promises pattern que puede ser enfocado en crawling o en alguna otra necesidad

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
