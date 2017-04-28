'use strict';

/**
 * Colorizes an output for the console
 * @param  {String} string
 * @return {String}
 */
function answer(string) {
  return `\x1b[33m${string}\x1b[0m`;
}

console.log(`
2.
---

Take a look at the 'requester' function.
${answer('Note: I rewrote the function to make it more readable.')}

- What it does?
${answer(`
Fetchs data from an URL using the "vanilla" fetch function;
Maps the results as JSON and then returns the request promise.
`)}

- How it's used? Add different use-case examples that covers every functionality.
${answer(`
1. It can be used to request any kind of HTTP method, like a POST for authentication,
a GET for and index of resources or a PUT to update a resource.
2. Can receive a base url (https://api.company.com), if that happens, then the base
and the URL path are concatenated (as arrays) and joined with slashs, forming an URL.
The use case for this, would be common requests to the same API, we might have the
base API endpoint in an enviroment variable o in a service and we wouldn't have to
declare it in any request.
-> Example:
[requester('POST', $ENV.API_URL)([\`user/{user.id}/posts\`])]

3. If the base url is falsy, then the raw path is used and URL. For example, to
request uncommon external APIs.
-> Example:
[requester('POST', null)(['https://api.another.com/users'])]

4. The optional headers might be a simple way to include authorization heade, for example.
-> Example:
[requester('POST', null, {Authorization: user.token})(['https://api.another.com/users'])]

5. The most useful feature of this function is the ability to share the configurations
of the request for many paths:
-> Example:
const indexRequest = requester('GET', $ENV.API_URL, { accept, authorization });

const users = indexRequest('users')
  .then(...);

const payments = indexRequest('payments')
  .then(...);
`)}


- How it is called this design pattern or technique?
${answer(`
Maybe the Mixin pattern would fit in this function, but is also similar in form
to the Modular pattern (with a single public function). At the end of the day is
a wrapper that allows us even to change the request library just by modifying this
implementation.
`)}

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => {
    const url = (base ? [base, ...path] : path).join('/');

    return fetch(url, { method, headers })
      .then(response => response.json());
  };
}
