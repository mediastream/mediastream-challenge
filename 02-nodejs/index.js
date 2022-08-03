'use strict'
const mongoose = require('mongoose')
// const { MongoClient } = require('mongodb')

const express = require('express')
const { parse } = require('json2csv')

const User = require('./models/User')

// Setup Express.js app
const app = express()
const url = 'mongodb://localhost:3003'
const db = 'mediastream-challenge'
const mongo = mongoose.connect(`${url}/${db}`)
mongo.then(() => {
  console.log('connected')
}).catch((err) => {
  console.log('err', err)
})

app.listen(3000)

app.get('/users', async (req, res) => {
  const users = await User.find().lean()
  const csv = parse(users)
  res.attachment('users.csv')
  res.status(200).send(csv)
})
