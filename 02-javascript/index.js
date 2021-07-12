'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
  Es una función modularizada que permite hacer peticiones a un servidor o API para obtener o hacer operaciones con datos guardados.
  Permite a través de parámetros hacer diferentes operaciones (GET, POST, entre otras).
  Su modularidad y parametrización permite ser utilizada para muchos casos de consumo de API sin necesidad de reescribir nuevas funciones.

- How it's used? Add different use-case examples that covers every functionality.
  Para este caso dos ejemplos, peticiones post y get

- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
    return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
        .then(r => r.json());
}


//Get Request
const getMediaStreamData = requester('GET', 'https://api.github.com/users/mediastream')
getMediaStreamData(['events']).then((response) => console.log(response, response.length))

//En los casos de put post o delete para que la función sirva, debe agregarse otros parámetros opcionales a la función requester, por ejemplo:
//en el caso de put o delete recibiría un "id" asociado al registro que se desea modificar
const getMediaStreamData = requester('PUT', 'https://api.github.com/users/mediastream')
getMediaStreamData(['gist'], id).then((response) => console.log(response))