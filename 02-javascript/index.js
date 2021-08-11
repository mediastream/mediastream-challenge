'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

    A:/ It's a function that receives as arguments an http method, a base url (optional) and
    an object that contains the headers involved, as a result it returns a function
    that performs a fetch based on the indicated arguments that,
    if successful, returns a promise that renders the API response in JSON format.

- How it's used? Add different use-case examples that covers every functionality.

    A:/ 

    Use case 1: The more basic case is for get info about
- How it is called this design pattern or technique?

    A:/ 

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

console.log(`

- What it does?

    A:/ Basicly it's a function that performs a fetch based on the custom parameters passed to and returns a promise with a JSON format with the response.

- How it's used? Add different use-case examples that covers every functionality.

    A:/ It's receives as arguments an http method, a base url (optional) and
    an object that contains the headers involved, as a result it returns a function
    that performs a fetch based on the indicated arguments that,
    if successful, returns a promise that renders the API response in JSON format.

    Use case 1: The more basic case is for get info from de API: (Followers, Repos, Gist's...)
    USe case 2: Another basic use case is for send info to the API with a POST method, using a body with the info


    `);

  const BASE_URI_FOLLOWERS = "https://api.github.com/users/mediastream/followers"

  let getInfoFollowers = requester('GET', BASE_URI_FOLLOWERS);

console.log(`
- How it is called this design pattern or technique?

    A:/ Is posssibly a factory function or a part of a "Module pattern", 

`);