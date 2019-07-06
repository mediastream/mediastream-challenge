'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Simplify requests, allow more specific requests and control responses.
- How it's used? Add different use-case examples that covers every functionality.
  Below I add examples of its use, in addition to this we can send forms, in summary all the functionality ajax but easy and with promises.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
 return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
   .then(r => r.json());
}

const headers = new Headers({
  'Content-Type': 'application/json'
});

const method = {
  get: 'GET',
  create: 'POST',
  update: 'PUT',
  delete: 'DELETE'
};

// Can group request for method
let get_requests = new requester( method.get, 'https://api.github.com/users/mediastream', headers);

// Get data from endpoint
get_requests()
  .then((res) => {
    console.log("==========================")
    console.log("General data: ", res);
    // Chain request
    get_requests(['repos'])
      .then((res) => {
        console.log("==========================")
        console.log("General repositories: ", res);
      })
  });