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
const rp = require('request-promise')


// Realiza peticion a url especificas con metodos dinamicos, y entre el resultado de dicho request en formato JSON
function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

// With 'request-promise' package
function makeRequest(method, baseUri, path = []) {
  return rp({
    method: method,
    uri: baseUri ? `${baseUri}/${path}` : path,
    headers: { 'Accept': '*/*' },
    json: true
  })
  .then(r => r.json())
  .catch(err => console.log(`Error al realizar peticion | detalles: ${err}`))
}
