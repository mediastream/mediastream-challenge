"use strict";

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does? : CRUD
- How it's used? Add different use-case examples that covers every functionality. : Protocol http Methods(GET,PUT,DELETE,UPDATE;PATCH)
- How it is called this design pattern or technique? : APi REST FULL 

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require("isomorphic-fetch"); // See: https://github.com/matthew-andrews/isomorphic-fetch
function requester(method, base, headers = { Accept: "*/*" }) {
  return (path = []) =>
    fetch((base ? [base, ...path] : path).join("/"), {
      method,
      headers,
    }).then((r) => r.json());
}

const url = "https://api.github.com/users/mediastream";

//GET
let fetcher = requester("GET", url);
fetcher().then((resp) => {
  console.log("GET METHOD", resp);
});

//POST
fetcher = requester("POST", url);
fetcher().then((resp) => {
  console.log("POST METHOD", resp);
});

//PUT
fetcher = requester("PUT", url);
fetcher().then((resp) => {
  console.log("PUT METHOD", resp);
});

//DELETED
fetcher = requester("DELETE", url);
fetcher().then((resp) => {
  console.log("DELETED  METHOD", resp);
});