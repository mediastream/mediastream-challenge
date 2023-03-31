'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

const PORT = 3000
const PATH = '/users'

// Route for streaming users
app.get(PATH, async (req, res, next) => {
  try {
    // Crenado un cursor del stream de usuarios
    const cursor = User.find().cursor()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename="users.json"')

    // Haciendo el stream de usuarios como objeto JSON
    cursor.on('data', (usuario) => res.write(JSON.stringify(usuario)))

    // Terminando el stream cuando no existan mas usuarios
    cursor.on('end', () => res.end())
  } catch (err) {
    next(err)
  }
})

// TODO: everything else
app.listen(PORT, () => {
  console.log(`> Service created in http://localhost:${PORT}${PATH}`)
})
