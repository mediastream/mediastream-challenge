'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
R: To make XHR calls using fetch in a more readable way than the original library code or API

- How it's used? Add different use-case examples that covers every functionality.
R: Examples in the code

- How it is called this design pattern or technique?
R: This is a factory functions

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

// Method GET, basic using:
requester('GET', 'https://api.github.com')(['users', 'mediastream'])
  .then(res => {
    console.log(res)
  });

/*
Method POST and custom header request
requester('POST', 'https://api.github.com', {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhb.example-token.f2XNCmg'
})(['users', 'mediastream'])
  .then(res => {
    console.log(res)
  })
*/
