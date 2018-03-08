'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

/*
* Para este proyecto, he implementado una arquitectura reducida para ésta entrega, de desarrollo propio de API Rest que llevo implementando en todos mis desarrollos.
* decidí implementar esto, por el rendimiento que genera utilizar dicha implementación, donde cada servicio de la API es un módulo
* instanciable y que luego se destruye al finalizar su ejecución.
*
* Importante a tener en cuenta: No me preocupé de levantar poolConnections de MongoDB,sólo la utilizo su conexión en la capa DAL - UsuariosDAO.js
*
* Respecto a la entrega del ejercicio 4, no alcanzo a realizarlo.
*/
const Servidores =  require("./Start.Rest.Config");

//Servidores.Rest.Http.start();
Servidores.Rest.Express.Normal.start();
//Servidores.Rest.Express.SSL.start();
