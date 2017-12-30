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

/**
 * 1) This function allow us to consume APIs.
 * We can provide the method to use (GET, POST, UPDATE, DELETE, etc), the base url for the API and headers if are needed.
 *
 * 2) See below
 *
 * 3) Mmmm... I don't know what is the name of this pattern design but use asynchronic calls to a server like a promises.
 * **/
const url = 'https://api.github.com/users/mediastream';

/**
 * 2) Use methods
 * **/
// Specified a verb and url
var a = requester('GET', url);
a().then(data => console.log(data));

// Adding a path in the API
a(['repos']).then(data => console.log(data));

// Adding specific headers
var a = requester('GET', url, { 'Content-Type': 'application/json; charset=utf-8' });
a().then(data => console.log(data));
