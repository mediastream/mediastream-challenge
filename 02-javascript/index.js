'use strict';
var colors = require('colors');
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

console.info(`
******************************************
                Answer
******************************************
- What it does?
It does a request to an specific endpoint and parse the body response as a JSON.
The request is an async op built on top of a Promise object.

- How it's used? Add differente use-case examples that covers every functionality

1) Simplest case with GET verb:
---
var requestBuilder = requester('GET', 'https://api.gitbhub.com')
var requestPromise = requestBuilder('users', 'mediastream');
---

URL result: https://api.gitbhub.com/users/mediastream
Request header result: 
   GET /users/mediastream
   Host: api.gitbhub.com
   Accept: */*

2) With custom header
---
var requestBuilder = requester('GET', 'https://api.gitbhub.com', {
  Authorization: 'Token 123mytoken'
})
var requestPromise = requestBuilder('users', 'mediastream')
---

URL result: https://api.gitbhub.com/users/mediastream
Request header: 
   GET /users/mediastream
   Host: api.gitbhub.com
   Authorization: Token 123mytoken

The initially defined custom header will be used in every subsequent request
built by the requestBuilder.

- How it is called this design pattern or technique?
Besides the polyfill workaround, what we have an lambda/arrow function as a functional feature from ES6.
We may also think the 'requester' function as a request builder.
`.yellow)