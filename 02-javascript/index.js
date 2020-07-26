'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

  It's a request manager based in fetch library

- How it's used?

  Add different use-case examples that covers every functionality. See examples below.

- How it is called this design pattern or technique?

  It's based on factory design pattern.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

/**
 *
 * @param method
 * @param base
 * @param headers
 * @return {function(*=): Promise<any>}
 */
function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const URL_BASE = 'https://api.github.com/users/mediastream';

//Example with GET
let fetcher = requester('GET', URL_BASE);
fetcher().then(data => {
  console.log("GET ", data);
});

//Example with POST
fetcher = requester('POST', URL_BASE);
fetcher().then(data => {
  console.log("POST ", data);
});

