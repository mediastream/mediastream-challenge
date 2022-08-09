'use strict'
const cluster = require('cluster')
const os = require('os')
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

// Setup database
const mongooseUri = process.env.MONGOOSE_URI || 'mongodb://localhost/mediastream-challenge'
mongoose.Promise = Promise
mongoose.connect(mongooseUri, { useMongoClient: true })
  .then(() => console.log('Conected to MongoDB successfully'))
  .catch((error) => console.log(`Error trying to connect to MongoDB --> ${error}`))

// Setup Express.js app
const app = express()

/**
 * Route config
 */
const Routes = {
  users: {
    get: require('./routes/users/get')
  }
}

// Route User
app.get('/users', Routes.users.get)

/**
 * Server Startup
 */
const workers = {}
const maxWorkers = os.cpus().length || 1

const spawnWorker = () => {
  const worker = cluster.fork()
  workers[worker.pid] = worker
  return worker
}

if (cluster.isMaster) {
  for (let i = 0; i < maxWorkers; i++) {
    spawnWorker()
  }
  cluster.on('death', (worker) => {
    console.log(`[${(new Date()).toISOString()}] API Worker (PID: ${worker.pid}) died. Spawning a new process...`)
    spawnWorker()
  })
} else {
  app.listen({ port: process.env.PORT || 3000 }, () => {
    console.log(`[${(new Date()).toISOString()}] 🚀 API Server instance ready`)
  })
}
