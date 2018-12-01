'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
    This makes an HTTP request to the base url and path, if provided.
    
- How it's used? Add different use-case examples that covers every functionality.
    Below
    
- How it is called this design pattern or technique?
  Currying fn()()

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers }).then(r => r.json())
}

// base url to make the request
const BASE_URL = 'https://api.github.com/users/mediastream';
// header object
const headers = {
  'Content-Type': 'application/json'
  // any other header
};

//use-case 1
// requester('GET', BASE_URL, headers)('repos')

//use-case 2
// requester('POST', BASE_URL, headers)()
