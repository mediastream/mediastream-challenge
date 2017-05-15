'use strict';

console.log("
2.
---

Take a look at the 'requester' function.

- What it does?

This method parse a request separated into the elemental parts of it (HTTP method, base URL and headers) and
return a function that outputs a json (properly for an API implementation) of the resource(s). The function receives a path to
complete the request, so this a middleware between the base request of an auth of API and the actual request of it.

- How it's used? Add different use-case examples that covers every functionality.


- How it is called this design pattern or technique?

This is a Handler method 

HINT: Use https://api.github.com/users/mediastream
");

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}