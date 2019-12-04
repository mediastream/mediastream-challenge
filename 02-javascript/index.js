'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- The function implements a polyfill to give functionality in browsers that don't 
  have them  as native
- How it's used? Add different use-case examples that covers every functionality.
  CASE USES IN CODE

- How it is called this design pattern or technique?
  This is a factory design, implementing and IIFE (Immediately-Invoked Function Expression) as a polyfill

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch



function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}



requester('GET', 'https://api.github.com/users/mediastream')().then((res)=>{
  console.dir(`USE-CASE 1 Simple Call: requester('GET', 'https://api.github.com/users/mediastream')() result:  ${JSON.stringify(res)}`)    
    
});

requester('GET', 'https://api.github.com')(['users', 'mediastream']).then((res)=> {
  console.log(`USE-CASE 2 With params: requester('GET', 'https://api.github.com')(['users', 'mediastream']) result:  ${JSON.stringify(res)}`);
});
