"use strict";

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
This function is used to obtain data from an external service (API).
the first of the three parameters corresponds to the restfull methods GET, POST, PUT, PATH, DELETE,
the second parameter corresponds to the service url, example https://api.github.com/users/mediastream,
and the third parameter the header with the which is the request made

- How it's used? Add different use-case examples that covers every functionality.
requester("GET", "https://api.github.com", {
  "Content-Type": "application/json",
})(["users/mediastream"]).then(data => console.log(data));

- How it is called this design pattern or technique?
High order functions

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require("isomorphic-fetch"); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: "*/*" }) {
  return (path = []) =>
    fetch((base ? [base, ...path] : path).join("/"), { method, headers }).then(
      r => r.json(),
    );
}

// USE CASE
requester("GET", "https://api.github.com", {
  "Content-Type": "application/json",
})(["users/mediastream"]).then(data => console.log(data));

//USE CASE
async function gitApiService(path) {
  return requester("GET", "https://api.github.com", {
    "Content-Type": "application/json",
  })([path]);
}

(async () => {
  const response = await gitApiService("users/mediastream");
  console.log(response);
})().catch(err => {
  console.error(err);
});
