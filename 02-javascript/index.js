'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream

Ejemplo:

const fetch = require('node-fetch');       
    function search(query, cb) {
        return fetch('http://localhost/api/lee?q',{method: 'GET'})
          .then(res => res.text())
          .then(cb);
      }
    const Client = { search };
export default Client;


- What it does?
      La API Fetch proporciona un canal para obtener recursos a través de la red. 
       Basándose en un sistema de Peticiones (Request) y Respuestas (Response) 
       permite a un documento o aplicación mantener un diálogo con el servidor de 
       forma segura.
       
- How it's used? Add different use-case examples that covers every functionality.
      ejemplo de uso en funcion search.
      realiza un llamdo al endPoint 'http://localhost/api/lee?q' con metodo GET y parametro q.
      una promesa devuelve el callback cb y respuesta requerida.
       
- How it is called this design pattern or technique?
      ejemplo de uso ;
            componentDidMount() {
              Client.search('consulta', lee => {
                  let guarda = (JSON.parse(lee));
                  this.setState( {persona:guarda} );
        });
}   
  "headers": { "content-type": "application/json" },

`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}
