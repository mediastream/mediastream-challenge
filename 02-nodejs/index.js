'use strict'

const express = require('express')
const fs = require('fs')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  try {
    await saveAllUsers()
    res.json({ message: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

async function saveAllUsers () {
  return new Promise((resolve, reject) => {
    const csvStream = fs.createWriteStream('users.csv')
    csvStream.write('id,name,email\n')

    // As we have limited memory resources we load the users from the database in batches of 100 documents
    const usersCursor = User.find().batchSize(100).cursor()
    usersCursor
      .on('data', function (doc) {
        const { _id, name, email } = doc._doc
        csvStream.write(`${_id},${name},${email}\n`)
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('end', function () {
        console.log('Data has been written to users.csv')
        resolve()
      })
  })
}

app.listen(3000)
