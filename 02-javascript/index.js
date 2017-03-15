'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

function requesterAlt(method, base, headers = { Accept: '*/*' }) {
  var path = [];
  return fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
  ;
}

// asigno la promesa a una variable para luego manipularla
var promise = requesterAlt('GET', 'https://api.github.com/users/mediastream');

// se completa la promesa y se puede utilizar el recurso
promise.then(console.log);

console.log(`
La función se utiliza para realizar llamadas asíncronas por medio de una promesa ES6 (patrón de diseño),
recibe como argumentos un verbo http, la url de la petición y los header de manera opcional, pues
por defecto se aceptan headers de cualquier tipo.

La función retorna una promesa con el resultado de la petición en formato "json".

* Utiliza un operador ternario para validar la url de la petición. La función original la tuve que modificar,
ya que con el operador flecha se me bloquea y no logré capturar la respuesta de ninguna forma.
`);