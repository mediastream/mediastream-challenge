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


// -  What it does?
// -----------------
// Es una funcion que retorna una funcion y recibe una serie de parametros los cuales  permiten hacer una peticion a una direccion URL,  esta acepta un argumento y devuelve una función. La función devuelta también acepta un argumento


// - How it's used? Add different use-case examples that covers every functionality.

// Primera Forma de Usar
//------------------------
//const setConfig = requester('GET')
//setConfig(['https://api.github.com','users','mediastream']).then(response => console.log(response))

// Segunda Forma de Usar
//------------------------
//const setConfig = requester('GET')
//setConfig(['https://api.github.com/users/mediastream']).then(response => console.log(response))


// Tercera Forma de Usar
//-----------------------
const request = requester('GET','https://api.github.com/users/mediastream')
request().then(response => console.log(response))


//- How it is called this design pattern or technique?

// Este patron o tecnica de programacion funcional es llamada Curry esta permite reducir funcionas con mas  de un argumento.
