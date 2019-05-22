'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does? 
  -> FACTORY PATTERN FUNCTION. IT'S USED TO SEND API REQUESTS.
- How it's used? Add different use-case examples that covers every functionality.
  -> USE-CASE EXAMPLES BELLOW.
- How it is called this design pattern or technique?
  -> FACTORY PATTERN

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('es6-promise').polyfill();
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

// USE-CASE EXAMPLES
requester('GET', 'https://api.github.com')(['users', 'mediastream']).then(data => { console.log(data) });

// requester('POST', 'https://api.somesocialnetwork.com', {'Authorization': `Bearer XXX`, 'Content-Type': 'application/json', 'Accept': 'application/json', 'content_id': 1})(['post', 'like']).then(data => { console.log(data) });

// requester('DELETE', 'https://api.somesocialnetwork.com', {'Authorization': `Bearer XXX`, 'Content-Type': 'application/json', 'Accept': 'application/json', 'content_id': 1})(['post', 'like']).then(data => { console.log(data) });
