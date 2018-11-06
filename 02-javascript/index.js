'use strict';
const assert = require('assert');
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

//use to give a get request

const getRequester = requester('GET', 'https://api.github.com/users/mediastream')

getRequester(['repos']).then(
  response => {
    assert(Array.isArray(response));
  })

//use to give a delete request
const deleteRequester = requester('DELETE', 'https://api.github.com/users/mediastream')

deleteRequester(['orgs']).then(
  response => {
    assert.equal(response.documentation_url, 'https://developer.github.com/v3');
  })
/*
  the functions returns a
  function that returns a promise with the json result of a fetch request that only
  requires the path params
   it cant be used for POST or PUT since it does not recieve a request body

  the tecnique is called "high order function"

*/
