'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  It is a function to create a resource request, generate a api call. 
  Can receive the method, the url and the headers of the call  

- How it's used? Add different use-case examples that covers every functionality.
  examples below.

- How it is called this design pattern or technique?
  It is a declarative code, written in ES6, using promises and arrow functions. 
  Is like functional programming because the output of the call depends of the atributes that are passed.  

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const basePath = 'https://api.github.com/users/franlpz';

requester('GET',basePath)().then((rowCall)=>{
  console.log('Call #1: simple call')
  console.log(rowCall)
})

var githubApi = requester('GET',basePath)
githubApi().then((data1)=>{
  console.log('Call #2: create a "prototype like" function')
  console.log(data1);
});

githubApi(['followers']).then((data2)=>{
  // the path parameter is joined to the base bath by '/'
  console.log('Call #3: pass a path parameter (/followers)')
  console.log(data2);
});
