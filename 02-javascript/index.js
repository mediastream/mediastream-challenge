'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- Resp: Es un método para redireccionar request entrantes hacia su ubicación dentro del proyecto, permitiendo el manejo de distintas versiones de APIs entre otras cosas.
- How it's used? Add different use-case examples that covers every functionality.
- Resp:
	 Manejo de distintas versiones de un endpoint dependiendo de su origen,
	 si base es portalX el request final será de la siguiente forma: portalX/path/ 
- How it is called this design pattern or technique?
 Resp: Técnica de versionamiento
HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
  .then(r => r.json());
}
