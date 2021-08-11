'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
R- Se utiliza la biblioteca requerida isomorphic se le ingresa una URL y un metodo y se obtiene un json 
- How it's used? Add different use-case examples that covers every functionality.


- How it is called this design pattern or technique?
R- Patron creacional
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

//requester('POST', 'https://api.github.com/users/mediastream')().then(r => console.log(r));
requester('GET', 'https://api.github.com/users/mediastream')().then(r => console.log(r));