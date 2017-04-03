'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
	A: Returns a function that fectches a JSON object from URL containing JSON formatted data, using giving method and headers. 
	Its parameter is an array of subdirectories and join them with base URL.
	if base parameter exists, fetch function uses it and uses path array only if it is passed, if not base parameter, it uses path parameter.
- How it's used? Add different use-case examples that covers every functionality.
	A: var fu = requester('GET', "https://api.github.com");
		fu(["users","mediastream"]);
- How it is called this design pattern or technique?
	A: Promises and arrow function expression 

HINT: Use https://api.github.com/users/mediastream
`);
require('es6-promise').polyfill();
// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch


function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json()).then(function(j){console.log(j)});
}

var fu = requester('GET', "https://api.github.com");
fu(["users","mediastream"]);
