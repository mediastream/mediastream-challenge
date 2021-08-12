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

let first = () => {requester("GET", "https://api.github.com/users")(['mediastream']).then(
  res => console.log(res)
);
}

first();

console.log(`
1)It wraps underlined used methods for fetching data of different types.
2)is a reusable function which uses "isomorphic-fetch" to fetch response in cross-browser compliant fashion and makes it more dynamic.
--
let second = () =>{requester("PUT", "https://api.github.com/users")(['mojombo']).then(
  res => console.log(res)
);
}
We Can Consume CRUD operations and can hit different routes as it is a dynamic solution for routing.
3) It is a factory pattern which provides more legibility and shorten commonly occuring problems for Developers.
`)