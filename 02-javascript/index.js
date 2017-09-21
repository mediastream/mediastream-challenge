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

console.log(`1)Questions: 
    What it does?`);
console.log(`1)Answers:
    Uses the fetch global method to retrieve data through a URL, converts the result into a JSON and returns the request`);

console.log(`2)Questions:
    How it's used? Add different use-case examples that covers every functionality`);
console.log(`2)Answers:
        The optimal use case of this function must be used in the requests GET. For example:

        let method = 'GET';
        let base = 'https://api.github.com';
        let headers = { Accept: 'application/json' };

        requester(method, base, headers).then(r => r.json());


        The base parameter is optional if base is null the raw path and URL is used. For example:

        [requester(method, null, headers) ('otherUrl')]

        and if base is true,  it's used  the URL containing base. For example:
        requester(method, base, headers)

        The case of headers applied equal is an optional value and you can pass different headers depending on what you want to do. For example:

        A request where json data must be handled

        let headers = { Accept: 'application/json' };
        requester(method, base, headers)

        If the header parameter is null then accept any headers (Accept: '*/*')

        requester(method, base, null)   
    `);
    console.log(`3)Questions:
        How it is called this design pattern or technique?`);
    console.log(`3)Answers:
        From my point of view it would be the Mixin pattern because it has a minimal amount of complexity and is easy to reuse.`);    