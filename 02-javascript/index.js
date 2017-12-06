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
/*
 *** What it does? ***

The function requester is a general function that request a resource from a HTTP pipeline and
resolves it as a JSON. It manages the path of the resource, includes the method (GET, POST, PUT, etc) and
allows to set the headers of the request (by default it accepts all MIME types responses).

*** How it's used? ***

- Get the "https://api.github.com/users/mediastream" resource:
	requester('get', 'https://api.github.com/users/mediastream', { 'Accept': "*\/*", 'Content-Type': 'application/json' });

*** How it is called this design pattern or technique? ***

This design pattern is REST
*/
