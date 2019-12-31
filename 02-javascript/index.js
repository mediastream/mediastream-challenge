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

const call = requester('GET', 'https://api.github.com')(['users', 'mediastream']);
call.then(
    (result) => console.log(`Result 1:${JSON.stringify(result)}`)
).catch(
    (error) => console.log(error)
)

requester('GET','https://api.github.com/users/mediastream')().then((result) => console.log(`Result 2:${JSON.stringify(result)}`));
requester('GET','https://api.github.com/users/mediastream',{
  'Content-Type': 'application/json',
  'Accept':'*/*'}
)().then((result) => console.log(`Result 3:${JSON.stringify(result)}`));

console.log(`
  The function performs a REST request via the HTTP protocol.
  This technique is called functional programming.
`);