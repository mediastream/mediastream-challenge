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

//What it does:
// It's a higher order function, so it adds custom functionality to another function, in this case 'fetch()', and return a new function.
// The added functionality would be a customized, more flexible way to introduce parameters, and an already parsed JSON response.

//Pattern: Functional programming

// Use cases:
// Concat all parts of uri, usefull when even the base uri is dynamic. Validation for 'base' with a ternary op makes this possible.
requester('GET')(['https://api.github.com','users','mediastream']).then(res=>console.log(typeof res)); 

// Concat relative path, when using different routes within one base.
requester('GET','https://api.github.com')(['users','mediastream']).then(res=>console.log(typeof res));

// No params for resulting function of requester, thanks to 'path' having a default value.
requester('GET','https://api.github.com/users/mediastream')().then(res=>console.log(typeof res));

// Passing headers to requester method so it includes them in the resulting function.
requester('GET','https://api.github.com/users/mediastream',{Accept:'application/json'})().then(res=>console.log(typeof res));

// Creating an already set up methods for making requests. (Best use case in my opinion)

const requestUser = (user) => {
  return requester('GET','https://api.github.com/users',{Accept:'application/json'})([user])
}

requestUser('mediastream').then(res => console.log(res))

async function printUser(user){
  const userInfo = await requestUser(user)
  console.log(userInfo)
}

printUser('luis-agm')