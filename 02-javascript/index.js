'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
It permits to define a call to a webservice in promise; setting the url, the method to use to call it and the headers use, returning a function to which I can set the params in an array, the generated url to call the webservice is joined with /
- How it's used? Add different use-case examples that covers every functionality.
The examples are bellow
- How it is called this design pattern or technique?
Is like a command pattern

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

let my_requester_1 = requester('GET', 'https://api.github.com')

my_requester_1().then(r => console.log(r));

my_requester_1(['users']).then(r => console.log(r));

my_requester_1(['users', 'mediastream']).then(r => console.log(r));

let my_requester_2 = requester('POST')

my_requester_2(['something']).then(r => console.log(r), err => {
	console.log('it has been an error:', err);
});
