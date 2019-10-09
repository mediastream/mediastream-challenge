'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

It is a high order function, it can be used to create HTTP requests or implementation of HTTP clients to obtain JSON objects defining base parameters such as method, path and optionally headers.

- How it's used? Add different use-case examples that covers every functionality.

As a simple HTTP request:

requester('GET', 'https://api.github.com')(['users', 'demency']).then(
    (data) => console.log(data)
).catch(
    (error) => console.log(error)
)

As API client wrapper constructor:

const GithubAPI = requester('GET', 'https://api.github.com', {
  Accept: 'application/json' // using custom default content-type accepted
});

GithubAPI(['users/demency']).then((data) => {
  // Handle data...
  console.log(data);
}).catch((error) => {
  // Handle error...
});

- How it is called this design pattern or technique?

It is called a strategy pattern, it is a technique to perform extended implementations using a base behavior.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
