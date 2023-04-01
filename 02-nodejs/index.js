const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const json2csv = require('json2csv').parse;
const User = require('./models/User');

const app = express();

app.get('/users', (req, res) => {
  // Busca todos los usuarios en la base de datos
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    } else {
      // Convierte los usuarios a formato CSV
      const csv = json2csv(users);
      
      // Escribe los datos en un archivo .csv y descarga el archivo
      const csvWriter = createObjectCsvWriter({
        path: 'users.csv',
        header: [
          { id: 'name', title: 'Nombre' },
          { id: 'email', title: 'Correo electrónico' },
        ],
      });
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      
      csvWriter.writeRecords(users)
        .then(() => {
          res.send(csv);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error interno del servidor');
        });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
