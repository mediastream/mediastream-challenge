'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  R: Es un funcion que genera funciones de llamada http precargadas segun el metodo especificado y 
  opcionalmente la ruta base(Base path) o las cabeceras(Headers). La funcion creada puede recivir 
  multiples rutas(Paths) los cuales son unidos para formar el URL y al ejecutarce retorna una promesa 
  que entrega la respuesta en formato JSON

- How it's used? Add different use-case examples that covers every functionality.

- How it is called this design pattern or technique?
  R: Se llama Currying o funcion currificada es una tecnica utilizada para simplificar el llamado a una funcion,
  reduciendo el numero de parametros requeridos al utilizarla

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

const methodGetOne = requester('GET'); // Generar funcion para llamada (GET) sin ruta base, ni cabeceras
const methodPostOne = requester('POST', 'https://api.github.com/users/mediastream'); // Generar funcion para llamada (POST) con ruta base, pero sin cabeceras
const methodGetTwo = requester('GET', 'https://api.github.com/users/mediastream', {'Cache-Control': 'no-cache'}); // Generar funcion para llamada (GET) con ruta base y cabeceras
const methodPostTwo = requester('POST', null, {'Cache-Control': 'no-cache'}); // Generar funcion para llamada (POST) sin ruta base, pero con cabeceras

const methodGetMD = requester('GET', 'https://api.github.com/users/mediastream');
methodGetMD()
.then(res => {
  console.info(res);
})
.catch(err => {
  console.error(err);
});
