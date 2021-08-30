'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  It's a wrapper to make requests using fetch API (centralize the way to make all requests)
  
- How it's used? Add different use-case examples that covers every functionality.
  LN36.

- How it is called this design pattern or technique?
  FACADE Pattern

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

/**
 * @param method - GET
 * @param base - URL to make te request (you can set up a base url and then just merge with a custom path)
 * @param headers - Headers request like Authorization, Content-Type....
 * @returns {function(*=): Promise<void>}
 */
function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json(), err => err);
}

/**
 * Usage examples:
 */


// PROMISE
requester('GET', 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json')().then((res)=>{
  console.log('from promise');
  console.log(res);
})


// ASYNC AWAIT
// (async ()=>{
//   const re = await requester('GET', 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json')();
//   console.log(re);
// })();

const make = async () => {
  const re = await requester('GET', 'http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json')();
  console.log('using await');
  console.log(re);
}

make();


// DECLARATIVE
const req = requester('GET', 'https://jsonplaceholder.typicode.com');

req(['users']).then((res)=>{
  console.log(res);
})

req(['users/2']).then((res)=>{
  console.log(res);
})
