'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
    It performs an action to create a request that will be called later on. The requester function accepts params define what type of request we want to do and witch endpoint we want to hit.
    The return of the function, give us a new function that returns the body parsed to json already.

- How it's used? Add different use-case examples that covers every functionality.
    const getPosts = requester('get', 'https://jsonplaceholder.typicode.com', { Accept: 'application/json' });
    getPosts(['posts']).then(console.log)

- How it is called this design pattern or technique?
    Command Pattern

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
    return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
        .then(r => r.json())
}

const getPosts = requester('get', 'https://jsonplaceholder.typicode.com', { Accept: 'application/json' });
getPosts(['posts']).then(console.log)

