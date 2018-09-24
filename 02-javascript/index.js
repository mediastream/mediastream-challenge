'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
/*
  R: It is a factory to make call ajax passing the verb, request url and the request header.
*/

- How it's used? Add different use-case examples that covers every functionality.
/*
  R:
      requester('POST', 'https://github.com/mediastream').then(data => console.log(data));
 
      requester('GET', 'https://github.com/mediastream', '{ 'token' : 'XsdASeX87679' }').then(data => console.log(data));

      requester('DELETE', 'https://github.com/mediastream', '{ 'token' : 'XsdASeX87679' }').then(data => console.log(data));

*/

- How it is called this design pattern or technique?
/* R: Factory */

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
