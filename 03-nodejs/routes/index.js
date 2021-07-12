// ====================================================
//      Rutas API
// ====================================================

const express = require('express');
const app = express();

//archivo de rutas de modelo user
app.use('/users', require('./user'));

module.exports = app;