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


console.log(`

(lol! I was reading about this fetcher earlier today)

Answer 1:
---
As it says, it implements kind of an HTTP request helper.
It receives some parameters and returns an arrow function that calls to
the proper 'fetch' function, which, in turn, might be used by both the server and the client, providing a json formatted response.
The requester function receives the following parameters:
First, an HTTP mehod such as GET, POST, PUT, etc...
Second, according to the context, it looks like a base URL string ('https://api.github.com'),
followed by path, which is optional, and should correspond to some array-like resources string address (['users/mediastream']), REST style, methinks.
Third, HTTP headers which should be the classic value-pair object with the corresponding headers options.
The requester function returns an arrow function with a single parameter, which is the aforementioned path or an empty array by default.
This arrow function is thenable (because of async comms) and as such finally provides the response in json format.
`);

console.log(`
Answer 2
---
Requester function acts like a wrapper (HOC if you will) around fetch.
A CRUD example may cover many cases of use

EXAMPLE
Client makes a GET request to server as per usual:
`);

const method = 'GET';
const base = 'https://api.github.com';
const headers = { Accept: '*/*' }
//inmediately after calling this IIFE, providing a direct array-like path to a resource, myPromise is in pending state
const myPromise = (requester(method, base, headers))(['users/mediastream']);

function delayedFunction() {
	console.log('EXAMPLE JSON response from server:');
	console.log(myPromise);
}

// calling the rest of the code and have it execute after 5 seconds
setTimeout(delayedFunction, 5000);

console.log(`
	const method = 'GET';
	const base = 'https://api.github.com';
	const headers = { Accept: '*/*' }
	const myPromise = (requester(method, base, headers))(['users/mediastream']);

Answer 3:
---
I do not have any idea about what you ask.
Are you asking about the High-Order-Component coming from functional-like minded guys?
Or are you referring to the async-by-nature Promise that lies behind the scene when calling this helper?


	`);
