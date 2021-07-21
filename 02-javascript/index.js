'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Facilita hacer peticiones http para obtener recursos de cualquier servidor que contenga una API.
- How it's used? Add different use-case examples that covers every functionality.
  Se usa con diferentes metodos como lo son "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" entre otros.
- How it is called this design pattern or technique?
  Protocolo http.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const res = requester('get', 'https://api.github.com/users/mediastream');
res().then(res => {
  console.log(res);
})