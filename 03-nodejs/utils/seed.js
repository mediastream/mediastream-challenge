'use strict';

const faker = require('faker');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://test:test@ds033656-a0.mlab.com:33656,ds033656-a1.mlab.com:33656/test?replicaSet=rs-ds033656');

console.log("seed");

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
