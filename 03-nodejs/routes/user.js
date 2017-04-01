const express = require('express');
const router = express.Router();
const User = require('../models/User');

const docToCSV = require('../utils/csv');


router.get('/users', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-disposition': 'attachment; filename=bulk.csv'
  });

  res.write(docToCSV.makeHeaders(['Name', 'Email']));

  var Stream = User.find().cursor();

  Stream.on('data', (doc) => {
    res.write(docToCSV.parseRow([doc.name, doc.email]));
  });

  Stream.on('end', () => {
    res.end();
    console.log('done outputting file');
  });

  Stream.on('error', (err) => {
    console.log('err outputting file', err);
  });

});


module.exports = router;