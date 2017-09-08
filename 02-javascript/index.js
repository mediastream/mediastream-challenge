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

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
// its meant to make fetch available in both the browser and the server,
// it fetched data from an api address
// this is the way its used:
requester('get', 'https://api.github.com/users/mediastream')().then(console.log)
// we could pass a path as a parameter in the curried function
requester('get', 'https://api.github.com')(['users/mediastream']).then(console.log)
// we can separate the resources like an array so it can be easier to dinamically populate it
requester('get', 'https://api.github.com')(['users', 'mediastream']).then(console.log)
// this technique is called currying
// I cant think of a way to pass the body of the request in this function,
// if I wanted to post a new resource for example
