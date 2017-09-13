'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
-- Retorna una función que hace peticiones a apis web y el resultado es una promesa, al utilizar una librería isomorfica, puede implementarse tanto en backend como en frontend usando el mismo leguaje

- How it's used? Add different use-case examples that covers every functionality.
-- En el código

- How it is called this design pattern or technique?
-- Considero que esta técnica es Curring

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

requester('get', '//api.github.com/users/mediastream')()
  .then(r => {
    console.log(`Consultando la raíz del API -> `, r.avatar_url)
  });


requester('get', '//api.github.com/users/mediastream')(['received_events'])
  .then(r => {
    console.log(`Consultando un PATH del API -> `, r[0].actor.login);
  });
