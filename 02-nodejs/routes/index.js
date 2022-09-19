const router = require('express').Router()
const { fork } = require('child_process')

router.get('/users', async function (req, res) {
  const child = fork('02-nodejs/processCSV.js')
  console.log('Running main.js')
  console.log('Forking a new subprocess....')
  const data = [
    {
      name: 'Saul',
      email: 'saul@gmail.com'
    },
    {
      name: 'Enrique',
      email: 'enrique@gmail.com '

    },
    {
      name: 'Adriana',
      email: 'adriana@gmail.com'

    }
  ]
  child.send({ message: data })

  child.on('message', function (data) {
    res.header('Content-Type', 'text/csv')
    console.log(data.message)
    res.send(data.message)
    console.log('child process exited')
  })
})

module.exports = router
