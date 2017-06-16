'use strict';

/*console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?

HINT: Use https://api.github.com/users/mediastream
`);*/

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch



function requester(method, base, headers = { Accept: '*/*' }) {
  	return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers }).then(r => r.json());
}
/*
1. que hace?
Entiendo que requester llama a la funcion fetch para realizar peteciones asyncronas definiendo en base la direccion del recurso que se solicita, method es el tipo de petición, GET POST DELETE PUT etc y en la propieda then se obtiene el resultado, en formato json.
fetch retorna una promise con el resultado de la peticion para saber si fue ejecutada o no.

no tengo conocimineto de como se debe llamar la funcion ya que al hacer la peticion
*/
requester("GET","https://api.github.com/users/mediastream");
/*
retorna una funcion que asumo que es una funcion anonima pero nunca he utilizado este tipo de programación por lo que no se como se puede usar y cual es el patron de diseño.
*/






