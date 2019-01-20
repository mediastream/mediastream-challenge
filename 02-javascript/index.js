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

(async () => {
  const example1 = await requester('get', 'https://api.github.com')(['users', 'mediastream']);
  console.log(example1);
  console.log('______________________________________________________');
  const example2 = await requester('get', 'https://api.github.com', { 'Content-Type': 'application/json' })(['users', 'mediastream']);
  console.log(example2);
})()
