'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does? respuesta: esa funcion Fecth es para hacer una peticion a una URL y devuelve r.json()
se usa de esa manera debido a que la funcion Fecth es polyfill para los navegadores, que no tienen función
 de búsqueda (caniuse.com/#search=fetch). Agregará la función de búsqueda a su objeto de ventana del 
 navegador. Mientras que isomorphic-fetch es la implementación de fetch tanto para node.js como para el 
 navegador, construido sobre fetch polyfill.

- How it's used? Add different use-case examples that covers every functionality. respuesta: se puede usar
de dos maneras node-fecth para el lado del servidor y whatwg-fetch para el lado del cliente se pueden presentar 
diferentes casos como estos: 

var  fetch  = require ( ' node-fetch ' ) ; 
 
//  si está en el nodo v0.10, primero configure una biblioteca Promise, ej.
//  fetch.Promise = require ('bluebird');
 
//  texto sin formato o html
 
fetch ( ' https://github.com/ ' )
    . luego ( función ( res ) { 
        volver res . texto ( ) ; 
    } ) . luego ( función ( cuerpo ) { 
        consola . registro ( cuerpo ) ;
    } ) ;
 
//  json
 
fetch ( ' https://api.github.com/users/github ' )
    . luego ( función ( res ) { 
        volver res . json ( ) ; 
    } ) . entonces ( función ( json ) { 
        consola . log ( json ) ;
    } ) ;
 
//  error de red de captura
//  Las respuestas 3xx-5xx NO son errores de red, y deberían manejarse en then ()
//  solo necesitas una captura () al final de tu cadena de promesas
 
fetch ( ' http: //domain.invalid/ ' )
    . catch ( función ( err ) { 
        consola . log ( err ) ;
    } ) ;
 
//  stream
//  la forma de node.js es usar stream cuando sea posible
 
fetch ( ' https://assets-cdn.github.com/images/modules/logos_page/Octocat.png ' )
    . luego ( función ( res ) { 
        var  dest  = fs . createWriteStream ( ' ./octocat.png ' ) ; 
        res . cuerpo . tubería ( dest ) ;
    } ) ;
 
//  buffer
//  si prefiere almacenar en caché los datos binarios en su totalidad, use el buffer ()
//  tenga en cuenta que buffer () es una API solo de captación de nodos
 
var  fileType  = require ( ' tipo de archivo ' ) ; 
fetch ( ' https://assets-cdn.github.com/images/modules/logos_page/Octocat.png ' )
    . luego ( función ( res ) { 
        volver res . buffer ( ) ; 
    } ) . then ( function ( buffer ) { 
        fileType ( buffer ) ;
    } ) ;
 
//  meta
 
fetch ( ' https://github.com/ ' )
    . luego ( función ( res ) { 
        consola . log ( res . ok ) ;
        consola . log ( res . de estado ) ;
        consola . log ( res . statusText ) ;
        consola . log ( res . headers . raw ( ) ) ;
        consola . log ( res . headers . get ( ' tipo de contenido ' ) ) ;
    } ) ;
 
//  post
 
fetch ( ' http://httpbin.org/post ' , {  method : ' POST ' ,  cuerpo : ' a = 1 ' } )    
    . luego ( función ( res ) { 
        volver res . json ( ) ; 
    } ) . entonces ( función ( json ) { 
        consola . log ( json ) ;
    } ) ;
 
//  publicar con la secuencia de reanudar
 
var  resumer  = require ( ' reanudador ' ) ; 
var  stream  = reanudador ( ) . cola ( ' a = 1 ' ) . end ( ) ; 
fetch ( ' http://httpbin.org/post ' , {  method : ' POST ' ,  cuerpo :  stream  } )  
    . luego ( función ( res ) { 
        volver res . json ( ) ; 
    } ) . entonces ( función ( json ) { 
        consola . log ( json ) ;
    } ) ;
 
//  publicar con form-data (detectar multiparte)
 
var FormData = require ( ' form-data ' ) ;   
var  form  = new FormData ( ) ;  
forma . append ( ' a ' , 1 )  ;
fetch ( ' http://httpbin.org/post ' , {  method : ' POST ' ,  cuerpo :  formulario  } )  
    . luego ( función ( res ) { 
        volver res . json ( ) ; 
    } ) . entonces ( función ( json ) { 
        consola . log ( json ) ;
    } ) ;
 
//  publicar con datos de formulario (encabezados personalizados)
//  tenga en cuenta que getHeaders () es una API no estándar
 
var FormData = require ( ' form-data ' ) ;   
var  form  = new FormData ( ) ;  
forma . append ( ' a ' , 1 )  ;
fetch ( ' http://httpbin.org/post ' , {  method : ' POST ' ,  cuerpo :  formulario ,  encabezados : formulario . getHeaders ( ) } )    
    . luego ( función ( res ) { 
        volver res . json ( ) ; 
    } ) . entonces ( función ( json ) { 
        consola . log ( json ) ;
    } ) ;
 
//  nodo 0.12+, rendimiento con co
 
var  co  = require ( ' co ' ) ; 
co ( función * ( )  { 
    var  res  = rendimiento de obtención ( ' https://api.github.com/users/github ' ) ;  
    var  json  = rendimiento res . json ( ) ;  
    consola . log ( res ) ;
} ) ;

- How it is called this design pattern or technique? respuesta: Se le llama busqueda Isomorfica. 

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}


