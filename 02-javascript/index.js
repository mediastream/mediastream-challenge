'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Is an asyncronous request ajax via, which in it's arguments, define the verb (get, post, put, patch, delete),
  the url where will requests the resource and the headers what wait any mime/filetype, in this case I set
  for JSON format.

- How it's used? Add different use-case examples that covers every functionality.
	This encapsules the ajax request based in promise pattern

- How it is called this design pattern or technique?
 	It normally used in RESTful applications(architecture), but by using promises is called promises pattern, 
 	not rely of the backend language or platform, just it needs the endpoints work fine.

HINT: Use https://api.github.com/users/mediastream
`);
const express = require('express');
const app = express();
const router = express.Router();
app.use(router);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch


// function requester(method, base, headers = { Accept: '*/*' }) {
//   return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
//     .then(r => r.json());
// }

// modified requester

function requester(method, base, headers = { Accept: '*/*' }) {
  fetch( base, { method, headers })
    .then(r => r.json())
    .then(function(data){
    	console.log([data]);
    });
}

// https://randomuser.me/api/?results=10

router.get("/promises", function(req, res){
	requester('get', 'https://api.github.com/users/mediastream', 'application/json');	
});

app.listen(3000);
