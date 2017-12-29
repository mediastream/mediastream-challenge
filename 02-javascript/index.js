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
	Response:
	The function require 3 parameters, the first is mandatory, 
    if the second parameter is not provide, use the path
    the headers params have a default value
    use arrow function: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions
    use spread operator: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
	use the fetch method to retrieve data from a URL and corvert the result in JSON format
`);

requester('GET', 'https://api.github.com/users/mediastream')()
.then((res)=>{
	console.log('\n\n ***Case 1:\n ',res, '\n\n');
})

requester('GET')(['https://api.github.com/users/mediastream'])
.then((res)=>{
	console.log('\n\n ***Case 2:\n ',res, '\n\n');
})

requester('GET', 'https://api.github.com')(['users', 'mediastream'])
.then((res)=>{
	console.log('\n\n ***Case 3:\n ',res, '\n\n');
})

requester('GET', 'https://api.github.com/users')(['mediastream'])
.then((res)=>{
	console.log('\n\n ***Case 4:\n ',res, '\n\n');
})

requester('GET')(['https://api.github.com','users','mediastream'])
.then((res)=>{
	console.log('\n\n ***Case 5:\n ',res, '\n\n');
})
