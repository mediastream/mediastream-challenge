'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  execute an HTTP request to a url that is delivered to you by parameter and you will get the right data
- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?
  the technique is called currying, normally used in functional programming

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

requester('get', 'https://api.github.com/users/mediastream')()
  .then(
    data => console.log('example 1: ', data)
  )

let request = new requester('get', 'https://api.github.com/users');
request(['mediastream']).then(
  data => console.log('example 2: ', data)
  )
  
request = new requester('get', 'https://api.github.com');
request(['users', 'mediastream'])
  .then(
    data => console.log('example 3: ', data)
  )
  
request(['users', '00guille'])
  .then(
    data => console.log('example 4 reusing requester instance: ', data)
  )