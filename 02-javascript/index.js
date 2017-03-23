
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
const _ = require('lodash');


function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

var req = requester('get', 'https://api.github.com');

req(['users', 'mediastream'])
  .then(j => console.log(j));