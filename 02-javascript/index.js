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

/*
What it does?

This is a polyfill the fetch function, in this case consumes a url and method (GET) and add headers to the function.
*/

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

//Examples
//Method, Url service and headers (JSON)
requester("GET", "http://offline-news-api.herokuapp.com/stories", {"Content-Type": "application/json"})()
          .then(response => {
            console.log("Method, Url service and headers (JSON)");
            console.log("-------------------");
            console.log(response);
            console.log("-------------------");
          }).catch(function(error) {
              console.log("Failed!", error);
          });

//Method, Url service and headers (JSON) and parameters
requester("GET", "//offline-news-api.herokuapp.com/stories", {"Content-Type": "application/json"})(["258944"])
          .then(response => {
            console.log("Method, Url service and headers (JSON) and parameters");
            console.log("-------------------");
            console.log(response);
            console.log("-------------------");
          }).catch(function(error) {
              console.log("Failed!", error);
          });
