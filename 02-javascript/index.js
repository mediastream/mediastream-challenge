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
  return (path = []) =>
    fetch((base ? [base, ...path] : path).join('/'), { method, headers }).then(
      r => r.json()
    );
}

// How it is called this design pattern or technique?
// Requester es parte de un patrón de orquestación diseñado para la intercomunicación entre microservicios
// El patrón completo considera 4 elementos, el Responder, Requester, Publisher y Subscriber
// Siendo lo más básico a entender de este patrón, el mecanismo de request-response
// Un microservicio necesita manejar el escenario de solicitar una tarea a realizar por otro microservicio,
// tipicamente accediendo a él a traves de una url externa.

// What it does?
// en el ejemplo, la función requester intenta abstraer en la capa de aplicación las llamadas a otro microservicio.
// La función es agnóstica, ya que no está limitada a un servicio en particular, y su configuración depende del parametro base de la función
// el requester, acepta estos argumentos;
// method: específica el tipo de request HTTP, GET, POST, PUT, PATCH, UPDATE, DELETE.
// base: toma la url string completa de la llamada al servicio; para esto implementa el join(/) para separar la url string en el arreglo path
// siguiendo la convención estándar del nombramie to de recursos (sustantivos) y subrecursos para llamadas REST.
// headers, permite al ususario de esta función especificar HTTP Headers para la llamada, y en caso contrario el request header por omisión en Accept: '*/*';
// Por último el return es una promesa de tipo funcion del método fetch a traves de la implementación de isomorphic-fetch, que obtiene e intenta interpretar la respuesta del microservicio en formato JSON.
// El parametro path, es enviado a traves de la implementacion de una funcion anonima, que recibe los sustantivos para acceder a los recursos correspondientes, segun la misma documentacion de API

//How it's used?

//El ejemplo de uso más básico, sería la llamada a los usuarios de mediastream, como especificada en en este ejercicio.

requester('GET', 'https://api.github.com/users/mediastream', {
  'Content-Type': 'application/json',
  Accept: '*/*'
})(['repos']).then(repos => {
  repos.map(repo => {
    console.log(`repo name > ${repo.name} repo owner > ${repo.owner.login} `);
  });
});
