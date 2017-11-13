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
require('es6-promise').polyfill();
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch


function requester(method, base, headers = { Accept: '*/*' }) {
  return fetch(base.join('/'), { method, headers }).then(function(response) {
		if (response.status >= 400) {
			throw new Error("Error 400");
		}
		return response.json();
	});
};

requester('get', new Array('//api.github.com','users','mediastream')).then((json) =>  {
  console.log('funcion basada en promesas');
  console.log(json);
});

requester('get', ['//api.github.com/users/mediastream']).then((json) =>  {
  console.log('funcion basada en promesas sin join');
  console.log(json);
});