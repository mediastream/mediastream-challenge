'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Helper function to make request to mediastream API
- How it's used? Add different use-case examples that covers every functionality.
  First, we need pass the request method (POST, PUT, DELETE, GET, etc), then the base URL
  in this case, 'https://api.github.com/users/mediastream', Optionals a header Object, by default contains
  { Accept: '*/*' } and finally, the API paths or endpoints, if path param has more than one, the function
  make a join (['gists', '123'] === gists/123) then return the Promise.
- How it is called this design pattern or technique?
  Request helper

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

(async () => {
  const received_events = await requester('GET', 'https://api.github.com/users/mediastream')(['received_events'])
  received_events.forEach(({ actor: { login } }) => {
    console.log(`Actor: ${login}`)
  })
})()