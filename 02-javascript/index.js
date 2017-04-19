'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
	- Is used to obtain data from a remote path, as does the request library
- How it is used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch
const _ = require('lodash')

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}


requester('GET', 'http://offline-news-api.herokuapp.com')(['stories']).then( (stories) => {
	console.log('ALL STORIES', "____________________________________________________________________________________________\n")
	_.each(stories, (storie) => {
		console.log(storie)
	})	
})

requester('GET', 'http://offline-news-api.herokuapp.com')(['stories','258944']).then( (storie) => {
	console.log('SINGLE STORIE', "____________________________________________________________________________________________\n")
	console.log(storie)
})