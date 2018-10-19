'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  It's a function that implement an http request. It recieve the method, url, and header use the result to just pass in path. 
- How it's used? Add different use-case examples that covers every functionality.

    requester('GET','https://api.github.com').call(['users/mediastream']).then()
    requester('GET','https://api.github.com/users/mediastream').call().then()

- How it is called this design pattern or technique?
    factory design pattern
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

requester('GET','https://api.github.com/users/mediastream').call().then(
  r=>{
    
  })

requester('GET','https://api.github.com').call(['users/mediastream']).then(
  r=>{
    
  })