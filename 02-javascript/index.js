'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream

At the end please describe how did you get to the answer with details?
Example: 
I knew it before the test.
or
I found it in stack overflow
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

console.log(`El código esta hecho en ES6. Recibe como parametros el método a utilizar para la petición WEB ` +
            `ademas de una URL Base a la cuál se le realiza la petición. Utiliza condicionales ternarias para la ` +
            `validación de campos vacíos ademas de funciones JavaScript para concatenar strings. Además de esto utiliza` +
            `la función Arrow de ES6 para la declaración de funciones y trabaja con el sistema de promesas de ES6` +
            `por último devuelve a traves de un archivo JSON la información solicitada en el request.`);