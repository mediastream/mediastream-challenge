'use strict'

const faker = require('faker')
const _ = require('lodash')
const mongoose = require('mongoose')
const User = require('../models/User')

// Setup database for seed
const mongooseUri = process.env.MONGOOSE_URI || 'mongodb://localhost/mediastream-challenge'
mongoose.Promise = Promise
mongoose.connect(mongooseUri, { useMongoClient: true })
  .then(() => console.log('Conected to MongoDB successfully'))
  .catch((error) => console.log(`Error trying to connect to MongoDB --> ${error}`))

const AMMOUNT = {
  USERS: 100000
}

const users = _.times(AMMOUNT.USERS, n => ({
  name: faker.name.findName(),
  email: faker.internet.email()
}))

User.insertMany(users).then(() => {
  console.log('Seed complete')
  process.exit(0)
}, console.error.bind(console))
