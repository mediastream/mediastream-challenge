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
  return (path = [] , body= {}) => fetch((base ? [base, ...path] : path).join('/'), { method, headers ,body })
    .then(r => r.json());
}

//1 rutas absolutas, rutas y relativas solo una configuracion
var get = requester("get",'https://api.github.com' , "application/json");

 get(["users","mediastream"]).then(data => console.log('data',data)).catch(err=>console.log("err",err))

//2 get(["users","mediastream"]).then(data => console.log('data',data)).catch(err=>console.log("err",err))
//  get(["users","mediastream" ,"repos"]).then(data => console.log('repos___',data)).catch(err=>console.log("err2",err))
//  agrege body para poder usar post
//  post(["users","mediastream","gists"] , {gist_id : 1}).then(data => console.log('data',data)).catch(err=>console.log("err",err)) //



//3 el patron usado es Curryng : https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400
