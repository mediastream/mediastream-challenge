'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

/**
 * This code sets up a GET route for the '/users' endpoint. When a GET request is made to this
 * endpoint, it retrieves all users from the database using the `User.find({})` method and stores them
 * in the `users` variable. It then creates a CSV file with the headers "Name" and "Email" and adds
 * each user's name and email to the file. Finally, it sets the response headers to indicate that the
 * response is a CSV file and attaches the file to the response before sending it back to the client.
 **/
app.get('/users', async (req, res) => {
  console.log('HERE')
  const users = await User.find({}).exec()
  let content = 'Name, Email\r\n'
  users.forEach(user => { content += `${user.name},${user.email}\r\n` })
  res.header('Content-Type', 'text/csv')
  res.attachment('users.csv')
  res.send(content)
})

app.listen(3000)
