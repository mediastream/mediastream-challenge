'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

What it does?
The Isomorphic -fetch library, has a fetch function which uses the requesterts function that is passed the method that 
can be Get, Post, Path Delete or put, the base refers to the URL and the headers in case it has it and returns the Json of the fetch 
response
- How it's used? Add different use-case examples that covers every functionality.
This can be used in all methods and all URLs passing it the Headers
It is used by placing the function requester the method in this case the Get is used, the base that is the URL, as it does not have headers, it accepts all
requester('GET', 'https://api.github.com/users/mediastream')().then(response => console.log(response));
for this example, the header contains information
requester('GET', 'https://api.github.com/users/mediastream' , {country: 'chile'})().then(r => console.log(r));
- How it is called this design pattern or technique?
 Builder pattern

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
