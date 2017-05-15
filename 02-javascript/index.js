'use strict';

// console.log(`
// 2.
// ---

// Take a look at the 'requester' function.

// - What it does?
// -  It basically sets a type of request that can be used with different paths.It returns a function that accepts a path argument that otherwise will be set to an empty array. this.function will perform a network request to the given arguments. base for the url, method for configuring the verb(GET, POST) and headers that are by default are set to allow all. It will eventually parse the response as json.

// - How it's used? Add different use-case examples that covers every functionality.
var makeRequest = requester(GET, http://mysite.com/);

makeRequest(['employees']);

var makeRequest = requester(GET, http://mysite.com/, {Access-Control-Allow-Origin: http://www.example.com});

makeRequest('documents', 'posts');


// - How it is called this design pattern or technique?

// HINT: Use https://api.github.com/users/mediastream
// `);

// // Add fetch polyfill for Node.js

//require('es6-promise').polyfill();
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
