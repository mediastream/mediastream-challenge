'use strict'

const faker = require('faker')
const _ = require('lodash')
const { MongoClient } = require('mongodb')

const AMMOUNT = {
  USERS: 100000
}

const createFakeUsers = () => {
  return _.times(AMMOUNT.USERS, () => ({
    name: faker.name.findName(),
    email: faker.internet.email()
  }))
}

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'mediastream-challenge'

async function main () {
  await client.connect()
  console.log('Successfully connected to MongoDB server')
  const db = client.db(dbName)
  const users = db.collection('users')

  await users.insertMany(createFakeUsers())

  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
