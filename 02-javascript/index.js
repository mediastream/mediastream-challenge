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

/*
* Resp:
* La función requester() hace referencia a una ejecución de un Endpoint
* recibiendo como parametros el tipo de verbo http a utilzar, la uri del Endpoint,
* como tambien un objeto(header) para enviar las cabeceras de la consulta como
* tipo de respuesta, useragent.etc.
* recibiendo como respuesta un json.
*/
