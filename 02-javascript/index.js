'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
I do not know clearly, but I think it creates severals requests from the same url

- How it's used? Add different use-case examples that covers every functionality.
  
  fetch(url, options).then(function(response) {
    // handle HTTP response
  }, function(error) {
    // handle network error
  })
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(function(response) {
    response.status     //=> number 100–599
    response.statusText //=> String
    response.headers    //=> Headers
    response.url        //=> String

    return response.text()
  }, function(error) {
    error.message //=> String
  })

- How it is called this design pattern or technique?
 It's a Promises-based mechanism to make web requests, such as Ajax.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
