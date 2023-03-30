'use strict'

const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'mediastream-challenge'

const getAll = async () => {
  try {
    await client.connect()
    const db = client.db(dbName)
    const users = db.collection('users')
    return await users.find({}).toArray()
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    client.close()
  }
}

module.exports = {
  getAll
}
