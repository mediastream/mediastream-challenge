'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Make request to the API Rest defining method, base path and headers and fetch the data in json object in a promise

- How it's used? Add different use-case examples that covers every functionality.
  There is in the code

- How it is called this design pattern or technique?
  Uses Singleton pattern


HINT: Use https://api.github.com/users/mediastream
`);

const url = 'https://api.github.com/users/mediastream';

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

// One posible way to make all get request to the same url assingning the requested to a var
const request = requester('get', url);
request().then(res => console.log(res));

// Shorter way
requester('get', url)().then(res => console.log(res));

// Or set a promise in the response
const req = requester('get', url)();
req.then(res => console.log(res));
