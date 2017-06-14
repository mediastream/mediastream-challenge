'use strict';

const faker = require('faker');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
    
mongoose.connect('mongodb://localhost/mediastream-challenge', (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...');

  const User = require('../models/User');

  const AMMOUNT = {
    USERS: 100000,
  };

  const users = _.times(AMMOUNT.USERS, n => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
  }));

  User.insertMany(users).then(() => {
    console.log('Seed complete');
    process.exit(0);
  }, console.error.bind(console))
});

