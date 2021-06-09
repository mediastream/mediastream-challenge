'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
=> Requester function will return an anonymous function which we will call off as a normal function in any file.
- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?
=> It is closure based technique which gives the access to parent variables.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const base = 'https://api.github.com';
const fetch = requester('GET', base, { Accept: 'application/json' });

fetch(['users', 'mediastream']).then((res) => {
  console.log(res);
});
