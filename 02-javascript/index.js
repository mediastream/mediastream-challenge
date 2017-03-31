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

console.log(`
Respuesta:
1. Esta funcion encapsula todos los metodos de peticiones que uno puede realizar sobre los servicios WebAPI
(GET, DELETE, entre otros), adicional a ello resuelve la peticion (Promise) y ademas resuelve
la transformacion del JSON que retorna como respuesta la WebAPI.
De este metodo quedan excluidos los metodos de POST, PUT, PATCH debido a que no cuenta con data como parametro
de cobertura y por ende no tiene estructura de datos para ingresar/modificar.

2. Distintos usos dependiendo de cada una de las WebAPIs, pero a simple modo sin cambiar los HEADERS, serian:
- requester('GET', 'https://api.github.com/users/mediastream');
- requester('GET', 'https://api.github.com/users/mediastream/:id');
- requester('DELETE', 'https://api.github.com/users/mediastream/:id');

3. Estas son tecnicas de encapsulamiento de funcionalidades, se emplean generalmente cuando nuestros protocolos
de comunicacion y otros entes involucrados, solicitan ciertas caracteristicas, para este ejemplo en particular,
algunas WebAPIs necesitan ciertas cabeceras para aceptar la petición (WebToken), entonces en vez de generar
la cabezar para cada petición se encapsulan en una generica que haga la instruccion solicitada.
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

requester('GET', 'https://api.github.com/users/mediastream');

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
