'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

  R: esta función crea un request html según sus parametros y devuelve una promesa.
  al ejecutar la promesa se le pueden enviar parametros opcionales

- How it's used? Add different use-case examples that covers every functionality.

  R: los ejemplos están más abajo

- How it is called this design pattern or technique?

  R: no lo sé


HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

test_1();
test_2();
test_3();

async function test_1() {
  try {
    const res = await requester('GET', 'https://api.github.com/users');
    const result = await res(['mediastream']);
    console.log( 'ID: ' + result.id );
    
  } catch(e) {
    console.log(e);
  }
}

async function test_2() {
  try {
    const res = await requester('GET', 'https://api.github.com/users/mediastream');
    const result = await res();
    console.log( 'ID: ' + result.id );
    
  } catch(e) {
    console.log(e);
  }
}

async function test_3() {
  try {
    const header = { ContentType: 'text/html' };
    const res = await requester('GET', 'https://api.github.com/users/mediastream', header);
    const result = await res();
    console.log( 'ID: ' + result.id );
    
  } catch(e) {
    console.log(e);
  }
}


