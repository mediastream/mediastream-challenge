'use strict'

const express = require('express')

// Setup Express.js app
const app = express()

// Routes
app.use('/api/users', require('./routes/usersRoutes'))

app.listen(3000, () => {
  console.log('Server on port 3000')
})

/**
 * Separe un poco las cosas pensando de momento y como solucion temporal en una
 * arquitectura por capas, se que se puede mejorar pero para el cumple con lo requerido.
 */
