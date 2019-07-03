'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
R/: It's a function that return another funtion.
    Is used to wrap the scope of the component and so make it reusable

- How it's used? Add different use-case examples that covers every functionality.
R/:
    - requester(
        'get',
        'https://rickandmortyapi.com/api',
        { Accept: 'application/json' }
      )(['character'])
        .then(res => {
          console.log(res);
        });

    - requester('get')([
        'https://rickandmortyapi.com/api',
        'character'
      ])
        .then(res => {
          console.log(res);
        });

- How it is called this design pattern or technique?
R/: Functional programming

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

