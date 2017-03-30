'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?


Answer:

- From my knowledge (I know it is a lot more beside this) The code waits for the fetch to be done to execute the r.json().

- The implementation is done for the cases when a function can or cannot resolve o return a response, and it has to be specified the code that will be executed for both of the cases. It's used very often to requests to APIS o services, is known that there can be no answer from then, tnen a portion of code have to be executed to face those failures.

-It is called Promise pattern.



HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
