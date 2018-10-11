'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What does it?
Answer: Make an HTTP request request AJAX

- How is it used? Add different use-case examples that covers every functionality.
Answer: requester('PUT', 'https://localhost/register', {id : 10}).then(data => data : person);
requester('POST', 'https://localhost/register', {name: 'Matheus', age: '23'}).then(data => data : person);
requester('DELETE', 'https://localhost/register', {id : 10}).then(data => console.log(data));


- How is this design pattern or technique?
Answer: factory

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
