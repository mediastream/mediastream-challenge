'use strict';

const fs = require('fs');
const faker = require('faker');
const _ = require('lodash');

const AMMOUNT = {
  USERS: 50,
  HATS: 30,
};

const hats = _.times(AMMOUNT.HATS, n => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  material: faker.commerce.productMaterial(),
  price: faker.commerce.price(),
}));

const users = _.times(AMMOUNT.USERS, n => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  hats: _.sampleSize(hats, _.random(0, 5))
}));

console.log(JSON.stringify(users, null, 2));
