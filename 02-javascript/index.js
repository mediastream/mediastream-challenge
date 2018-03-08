'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
	Es una funcion que nos generar una petición según el metodo y la url base que nosotros espicifiquemos,
	las cabezeras son opcionales. Una vez generada la petición nos devuelve el resultado en JSON
- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?
	Esta tecnica se llama Currying se aplica en funciones con muchos argumentos, donde se fija algunos de ellos
	y se obtiene una función más corta.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

var res1 = requester('GET','https://api.github.com/users/mediastream');
var res2 = requester('GET','https://api.github.com/users/mediastream',{Autorization:'123456asdqwerty123456'});