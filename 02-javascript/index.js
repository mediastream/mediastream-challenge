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

/**
 * - What it does?
 * requester function can send the API request and can return the response of that request as JSON format.
 * 
 * - How it's used? Add different use-case examples that covers every functionality.
 * We can use this function as a normal javascript function to fetch some API requests.
 * There are three items to be used to send a normal request.
 * 1. Method: GET, POST, PUT, DELETE...
 * 2. URL of API.
 * 3. Header configuration of request (such as access token).
 * We can pass all these items as the parameters of requester function.
 * I will write an example of that below.
 * 
 * - How it is called this design pattern or technique?
 * As the hint, I will write the usage of requester to get data from this url - https://api.github.com/users/mediastream
 * requester('GET', 'https://api.github.com/users/mediastream').then(res => {console.log(res)});
 * In this case, we are using the default value of headers.
 */
