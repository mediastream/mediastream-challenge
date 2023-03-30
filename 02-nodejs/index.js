'use strict'

const app = require('./app')
const http = require('node:http')

const port = process.env.PORT ?? 3000
app.set('port', port)

const server = http.createServer(app)

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(`Port '${port}' requires elevated privileges`)
    process.exit(1)
  }

  if (error.code === 'EADDRINUSE') {
    console.error(`Port '${port}' is already in use`)
    process.exit(1)
  }
}

const onListening = () => console.log(`Listening on port: ${port}`)

server.on('error', onError)
server.on('listening', onListening)
server.listen(port)
