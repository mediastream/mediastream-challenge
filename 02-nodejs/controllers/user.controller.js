const fs = require('fs')
const { parse } = require('json2csv')

const User = require('../models/User')

const downloadUsers = async (_req, res) => {
  for await (const user of User.find().cursor()) {
    appendUsers(user)
  }
  res.send("<a href='/public/users.csv' download='usersd.csv' id='dd'></a><script>document.getElementById('dd').click()</script>")
}

const appendUsers = (users) => {
  const fields = ['name', 'email']
  const opts = { fields }
  const csv = parse(users, opts)
  return new Promise((resolve, reject) => {
    fs.appendFile('./02-nodejs/public/users.csv', csv, (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

module.exports = {
  downloadUsers
}
