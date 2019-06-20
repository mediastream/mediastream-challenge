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
require('es6-promise').polyfill();
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then( r => r.json());
}
console.log(`RESPUESTAS`);
console.log(`-------------------------------------------------------------------`);
console.log(`
- What it does?
-------------------------------------------------------------------
La función lo que hace es ejecutar la solicitud a un servidor de un recurso dado, recibe como parámetros:
1.- El método (GET,POST,PUT,...).
2.- La URL o base
3.- Los encabezados

; esta función, devuelve otra función, que recibe un arreglo con el path de la ubicación del recurso y 
devuelve un JSON.
`);
console.log(`-------------------------------------------------------------------`);
console.log(`
- How it's used? Add different use-case examples that covers every functionality.
-------------------------------------------------------------------
requester("GET","https://api.github.com")(["users","mediastream"]).then(console.log);

const getJSON = requester("GET","https://api.github.com");
getJSON(["users","mediastream"]).then(console.log);
getJSON(["users"]).then(console.log);
`);

`
requester("GET","https://api.github.com")(["users","mediastream"]).then(console.log);

const getJSON = requester("GET","https://api.github.com");
getJSON(["users","mediastream"]).then(console.log);
getJSON(["users"]).then(console.log);
`
console.log(`
- How it is called this design pattern or technique?
-------------------------------------------------------------------
Functional programming
`);