'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  R/ The fetch() function is a mechanism for programmatically making web requests in the browser. 

- How it's used? Add different use-case examples that covers every functionality.
R/ It is used passing the url argument, and the options (optionally)

- How it is called this design pattern or technique?
R/ I Think that the technique used here, and used in the library isomorphic-fetch is Promises, that
actually is an alternative to callbacks pattern.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

// function requester(method = 'GET', base = 'https://api.github.com/users/mediastream', headers = { Accept: '*/*' }) {
//   return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
//     .then(r => r.json());
// }

function requester(method, base, headers = { Accept: '*/*' }) {  
 fetch((base ? [base] : path).join('/'), { method, headers })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
        console.log(data);
    }); 
}


requester('GET', 'https://api.github.com/users/mediastream');
requester('POST', 'http://localhost:4043');