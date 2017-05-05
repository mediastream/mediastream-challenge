'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does? Build and return an especific requester base on the initials parametes (method,baseUrl,header), 
then you can use this requester to fetch data from internals paths on the base domain, 
and not need again to create a requster with the general parameters.
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique? Factory (Async Factory Functions)

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

let base = "https://api.github.com";
let path = [];
let gitHubRequester =  requester('get', base);

//calling base
gitHubRequester(path).then(json => {
    console.log(json);
});

//usig the built requester in internal path
path.push("users/mediastream");
gitHubRequester(path).then(json => {
    console.log(json);
});

//selft call
requester('get',base)(path).then(json => {
    console.log(json);
});
