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

// - What it does?
// From the data delivered to the "requester" function, it returns the result of the promise of "fetch", 
// obtained asynchronously, then the data is delivered in "json".

//- How it's used? Add different use-case examples that covers every functionality.
// This is an example from isomorphic-fetch, where fetch only receive one parameter,  
// is the url, then get the data, is sent and desplegate.
fetch('//offline-news-api.herokuapp.com/stories') //variante sin metodo ni cabecera, solo usando la base
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });

// - How it is called this design pattern or technique?
// The asynchronous programming patterns is used, because use a promise in the return.
// It's my first time using this library