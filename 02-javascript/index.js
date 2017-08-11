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

console.log(`Response:
  - What it does?
  The 'requester' function makes a HTTP request passing 'method' as HTTP method (GET, POST, PUT, ...),
  the 'base' parameter is the Host and the 'headers' are any optional headers to pass to the destination
  server (takes Accept: */* by default).
  The returned value is a function that accepts the path to make the request to the destination host
  and returns a promise with the JSON response received.

  - How it's used? Add different use-case examples that covers every functionality.
  * requester('get', 'https://api.github.com', { Accept: 'application/json' })(['users', 'mediastream'])
  * requester('get', 'https://api.github.com')(['users', 'mediastream'])
  * requester('get', 'https://api.github.com', { Accept: 'application/json' })(['users/mediastream'])
  * requester('get', 'https://api.github.com', { Accept: 'application/json' })('users/mediastream')

  - How it is called this design pattern or technique?
  This technique is known as closure.
`)

requester('get', 'https://api.github.com', { Accept: 'application/json' })(['users', 'mediastream'])
.then(json => console.log('JSON response:', json))

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
