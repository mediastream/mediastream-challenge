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


console.log(`
  - What it does?
    The requester is a function that allow do requestes with some params by default

  - How it's used? Add different use-case examples that covers every functionality.

      we can use this function for connect us with apis, servers etc .. , making requestes as post, get, put, delete and we goint to receive a promise

  - How it is called this design pattern or technique?

    The name of this pattern is immediately-invoked function expression
  
`)
