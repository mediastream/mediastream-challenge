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

let req = new requester('GET','https://api.github.com/users/mediastream');
req('').then(function(userData){
  console.log(userData);
});

req = new requester('GET','https://api.github.com/users/alvaro-neira');
req('').then(function(userData){
  console.log(userData);
});

req = new requester('GET','https://api.github.com/users');
req(['mediastream']).then(function(userData){
  console.log(userData);
});

req = new requester('GET','https://api.github.com');
req(['users','mediastream']).then(function(userData){
  console.log(userData);
});

console.log(`
aneira's comments
---
- What it does?
It makes an "ajaxy" HTTP Request, receives the response, parses the JSON and returns the corresponding object.
 
- How it's used? Add different use-case examples that covers every functionality.
It is a wrapper to the isomorphic-fetch library. You specify the URI and all the parameters of the request.
The examples are above (in the code).

- How it is called this design pattern or technique?
Promises

`);