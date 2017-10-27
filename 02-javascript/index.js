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

  it's a wrapper for the fetch api, useful to pre-configure HTTP requests.

- How it's used? Add different use-case examples that covers every functionality.

  the function recieves three parameters
  - method (GET, POST, PATCH, PUT, DELETE)
  - base (the url origin)
  - headers (object to set the headers of the following requests)

  to make a request with this function it is needed to call it, in order to
  configure the request, and then call the returned function with an array
  containing the parts of the url pathname.

  use cases:
  - 1: direct call

    requester('GET', 'https://api.github.com')(['users', 'mediastream'])
      .then(response => console.log(response))

  - 2: previously configured object

    apiReq = requester('GET', 'https://api.github.com')

    apiReq(['users', 'mediastream'])
      .then(response => console.log(response))

    apiReq(['users', 'hombrew'])
      .then(response => console.log(response))  

- How it is called this design pattern or technique?

  function closures

  reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
`)
