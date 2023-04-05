'use strict';

const faker = require('faker');
const _ = require('lodash');
const User = require('../models/User');

const AMMOUNT = {
  USERS: 100000,
};

const users = _.times(AMMOUNT.USERS, (n) => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
}));

User.insertMany(users).then(() => {
  console.log('Seed complete');
  process.exit(0);
}, console.error.bind(console));
