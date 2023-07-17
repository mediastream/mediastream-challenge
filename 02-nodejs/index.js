'use strict'

const express = require('express')
const fs = require('fs')
require('dotenv').config()
const User = require('./models/User')

// Setup Express.js app
const app = express()
const PORT = process.env.PORT || 3000
// TODO: everything else

app.get('/', function (req, res) {
  res.send('Welcome to Mediastream Api')
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().limit(process.env.USERS_LIMIT)

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' })
    }

    const csv = json2csvWithSelectedFields(users)

    fs.writeFile('users.csv', csv, (error) => {
      if (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to write CSV file' })
      }

      console.log('file saved')
      res.download('users.csv', (error) => {
        if (error) {
          console.error(error)
          return res.status(500).json({ error: 'Failed to download CSV file' })
        }

        fs.unlink('users.csv', (error) => {
          if (error) console.error(error)
          console.log('temporary file deleted')
        })
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

function json2csvWithSelectedFields (data) {
  const selectedFields = ['id', 'name', 'email']
  const csvRows = []
  csvRows.push(selectedFields.join(','))
  data.forEach((obj) => {
    const row = selectedFields.map((field) => obj[field])
    csvRows.push(row.join(','))
  })
  return csvRows.join('\n')
}

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`)
})

/*
  Here I made some changes, add a main GET / route that returns a simple Welcome to Mediastream Api message,
  put the application port in the PORT variable and add a console log to know when the server is running.

  I add the GET /users route to download the list of users in a .CSV file, first I get the list of users, if it's empty
  return a "No users found", if not, I call the json2csvWithSelectedFields function to convert the data to the .CSV file
  using only the fields 'id', 'name' and 'email', then I write the file in the users.csv, and I send it through the res
  with the res.download, after that I delete the file from the system, note that I also added error validation for each scenario with error codes.
  for each scenario with status codes.

  To manage the amount of users to be printed in the .CSV file add a variable in the .env file called USERS_LIMIT,
  that defines the limit of users, this way it is easier to deal with large amounts of data, depending on the needs of the query.
*/
