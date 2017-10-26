// requiero el controlador

var seed = require("./utils/seed.js");

  
//Genero la ruta

module.exports = function(app) {

  app.get('/seed', seed.bdcompleta);

};