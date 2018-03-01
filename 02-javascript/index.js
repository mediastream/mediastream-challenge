'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

R:  crea una función para hacer requests, en la que se puede pasar como argumento el metodo, la url y los headers, 
ya sea en el primer argumento de la función padre, como en el segundo de la funcion anidada en un array. 
Esta devuelve una promesa en el que viene el JSON de respuesta.

- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?

Esta técnica es llamada Currying y se usa mucho en functional programming.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

let req = requester('GET','https://api.github.com/users/mediastream')(['hola']);
let req2 = requester('GET','https://api.github.com/users/mediastream')();
let req3 = requester('GET','https://api.github.com/users')(['mediastream']);
req.then((res) => console.log(res));
req2.then((res) => console.log(res));