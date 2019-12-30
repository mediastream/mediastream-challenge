'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
un polyfill que permite obtener funcionalidades html5 en navegadores que no lo poseen de manera nativa

- How it's used? Add different use-case examples that covers every functionality.
Se utiliza pasando un metodo, ya sea 'GET' o 'POST' por ejemplo, junto con una base o url en este caso 
'https://api.github.com/users/mediastream', el parametro headers por defecto es igual a */*, finalmente
el metodo une con un / a traves de un join la información obtenida y regresa un json. Hay un ejemplo al final

- How it is called this design pattern or technique?
Modernizr

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
    return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
        .then(r => r.json());
}

requester('GET', 'https://api.github.com/users/mediastream')().then((res) => {
    console.log(`login: ${res.login}, id: ${res.id}`);
});