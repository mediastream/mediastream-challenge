'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
Hace una petición HTTP con el metodo "method" y a la url "base"

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

requester('get', 'https://api.github.com/users/mediastream')()
  .then(res => console.log(res));
