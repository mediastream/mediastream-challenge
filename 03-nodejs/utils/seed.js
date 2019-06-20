'use strict';

var faker = require('faker');
const _ = require('lodash');
const mongoose = require('mongoose');


//var randomName = faker.name.findName();
mongoose.connect('mongodb://localhost/mediastream-challenge',{ useNewUrlParser: true });
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
