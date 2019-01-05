'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
    It does an HTTP request to an url that you provide and you will get json with the proper data
    that you requested 

- How it's used? Add different use-case examples that covers every functionality.
  check in the code below 
- How it is called this design pattern or technique?
    this technique is called currying
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

//this is the common way of use it, you use the method you want in this case
// I use GET and then choose the url that you want to use and finish
requester('get', 'https://api.github.com/users/mediastream')().then(console.log)

