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

console.log(`
So what it does ?, basically this function is a 'wrapper' for a requester, where you can pass params as 
Method: POST - GET - DELETE - PATCH, etc
Base: This string is for add the base for any url for example: 
If we put all our request to an specific API, in this case "https://api.github.com", so we have the base path to the api call
so for next request with the same base we only need to add the missing part of the URL.
headers: this is only for add all headers that we need to send to the server,
maybe: Content-Type: json/application, Authorization: Token MY_TOKEN_HASH, and so on.
So first example will be like so.
`);

const requestBase = requester('GET', 'https://api.github.com', {"Content-Type": "json/application"});

console.log(`
How it can be used? just simple, like this way
`);

// Here we have a requestBase with a pre config variables, like, method, base API, and headers
// then we can use it like so:

// case 1
requestBase(["users", "mediastream"]).then((resp) => {
  console.log("Response Case 1", resp);
}).catch(() => {
  console.error("Error Case 1", error);
});

// case 2
requestBase(["users", "mediastream", "subscriptions"]).then((resp) => {
  console.log("Response Case 2", resp);
}).catch(() => {
  console.error("Error Case 2", error);
});

// case 3
requestBase(["users", "mediastream", "repos"]).then((resp) => {
  console.log("Response Case 3", resp);
}).catch(() => {
  console.error("Error Case 3", error);
});

console.log(`
How it is called this design pattern or technique?
Many people call this technique in many way, but I can call this like: Currying
what that's means, this way allow us to handle multiple steps in one function, this is the technique used for simulate Generators in ES6 / ES7
where you can init a function with some params and then you can use that function to get the next steps, as JS
doesn't have this ability in the earlier version, this way of implementation allow us use it.
`);