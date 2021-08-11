'use strict';

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

console.log(`---

- What it does?

-- This is some sort of request builder, it returns a simpler function that we can use to call any API method 

- How it's used? Add different use-case examples that covers every functionality.

-- const apiBuilder = requester('GET', 'https://api.github.com/users/mediastream');
-- apiBuilder(['repos']).then((response) => console.log(response));
-- this will return a Get request to https://api.github.com/users/mediastream/repos

- How it is called this design pattern or technique?

-- Builder Pattern using closures

`);