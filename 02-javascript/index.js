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

function requester(method, base, headers = {Accept: '*/*'}) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), {method, headers})
    .then(r => r.json());
}

console.log(` The requester function returns a function witch build the path to the resource to be used on a fetch call,
              based on the parameters given, and the returned function only returns the body of the response in JSON format`);

requester('GET')(['https://api.github.com/users/mediastream'])
  .then((response) => {
    console.log('Using only the required parameter `method`');
    console.log(response);
  });

requester('GET', 'https://api.github.com/users/mediastream')()
  .then((response) => {
    console.log('Using the complete path to the resource');
    console.log(response);
  });

requester('GET', 'https://api.github.com')(['users', 'mediastream'])
  .then((response) => {
    console.log('Using the domain parameter only, and passing to the returned function the path resource needed');
    console.log(response);
  });

console.log(` The pattern used is the Promise Pattern,
              and also its being used the Arrow Function instead of the function expression`);
