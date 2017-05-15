'use strict';

console.log("
2.
---

Take a look at the 'requester' function.

- What it does?

A: This method parse a request separated into the elemental parts of it (HTTP method, base URL and headers) and
process a function that outputs a json (properly for an API implementation) of the resource(s). The function receives a path to
complete the request, so this a middleware between the base request of an API and the actual request of it.
Basically, is a mechanism for programmatically making web requests, on the base that a isomorphic app run both client-side and
server-side.

- How it's used? Add different use-case examples that covers every functionality.

A: For example, on server side you can navigate through the app from a context, so you can get the data to a string and then return
everything to the client. On the other hand, client-side routing helps to fetch data while the UI is rendered, and then update 
the view dynamically. This kind of usage is very compatible and trend on React apps.

- How it is called this design pattern or technique?

A: This is a Handler method for a Request Mapper, using the Fetch Standard on Isomorphic routing.

HINT: Use https://api.github.com/users/mediastream
");

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}