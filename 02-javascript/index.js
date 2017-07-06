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

// 1.- Make a http request (like ajax), receiving a HTTP method and a URL and return a promise
// 2.-

var request = requester('GET', 'https://api.github.com/users/mediastream')
request()
    .then(function(json){
        console.log(json);
    })
    .catch(function(){
        console.log("error");
    });

var request2 = requester('GET', 'http://www.google.com')
request2()
    .then(function(json){
        console.log(json);
    })
    .catch(function(){
        console.log("error");
    });

// 3.- Promises.

