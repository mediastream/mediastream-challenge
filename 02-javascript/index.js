'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  It returns a function that fetchs a REST API based on resources given as an array.
  This function returns a promise qith the result.
  When calling requester() then method, baseURl must be provided.

- How it's used? Add different use-case examples that covers every functionality.
  It's used to interact with a REST API you can use POST, PUT, DELETE, GET methods.
  Although it doesnt let you set body parameters.

  requester("POST","api.com",{"Authorization":"Basic encodedData"})(["auth"])
  requester("GET","api.com")(["user","as12"])
  requester("DELETE","api.com")(["user","as12"])

- How it is called this design pattern or technique?
  Its called an Adapter

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
