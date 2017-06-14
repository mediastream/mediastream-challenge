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
Responses.

- What it does?
	* It makes a request to any endpoint and fetch his content
- How it's used? Add different use-case examples that covers every functionality.
	* Through the 'isomorphic-fetch' it makes possible to use this function as a isomorphic function
	  which means that can be used in the backend and the client without any problem.
- How it is called this design pattern or technique?
	* It is call a 'Isomorphic Application'
`);