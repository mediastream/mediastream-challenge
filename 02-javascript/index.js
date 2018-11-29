'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does? It uses the isomorphic-fetch libray to make a fetch with a given method and a url, it adds a default headers and return a json of the response.
- How it's used? Add different use-case examples that covers every functionality.
  requester('GET', 'https://api.github.com/users/mediastream')().then(r => console.log(r));
- How it is called this design pattern or technique? Function Composition

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
