'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

This is a higher-order function that serves to standardize the way HTTP requests are made.

- How it's used? Add different use-case examples that covers every functionality.

This higher-order function is used to configure the values of an http call to be used later, simply indicating the specific path route through the path variable

Below the higher-order function definition I leave 3 examples of use of this function.

- How it is called this design pattern or technique?

In this case, a higher-order function is implemented, which is a functional programming technique, as well as, an asynchronous HTTP request is made with the use of promises.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const githubRequest = requester('GET', 'https://api.github.com', { 'Content-Type': 'application/json' });
githubRequest((['users', 'mediastream']));
githubRequest((['users', 'jeffersonaguilar95']));
