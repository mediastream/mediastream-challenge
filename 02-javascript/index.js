'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Return a function that when called it, make a request to a server 
  with the initial params like: method, url and headers.
  We can also send an array of extra params to concat in the base url

- How it's used? Add different use-case examples that covers every functionality.
  **The explanation is at the bottom**

- How it is called this design pattern or technique?
  Higher-Order Functions

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) =>
    fetch((base ? [base, ...path] : path).join('/'), {
      method,
      headers,
    }).then((r) => r.json());
}

// - How it's used? Add different use-case examples that covers every functionality.

//Declare variables to set initial params
const method = 'get';
const baseUrl = 'https://api.github.com/users/mediastream';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

//Initialize requester function with initial params
const data = requester(method, baseUrl, headers);

//Get the return functions that returns a promise
//into another variables with new params
//depending on what we need
const userInfo = data();
const userRepos = data(['repos?per_page=1']);

//Call the return function to get the remote data
userInfo.then((res) => console.log('--- \n userInfo: \n', res));
userRepos.then((res) => console.log('--- \n userRepos: \n', res));
