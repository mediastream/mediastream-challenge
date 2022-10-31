'use strict'

const express = require('express')
const fs = require('fs')
const User = require('./models/User')
const { json2csv } = require('json-2-csv')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({})
      .select({ _id: 0, name: 1, email: 1 })
      .lean()

    json2csv(users, (err, csv) => {
      if (err) next(err)
      fs.writeFileSync('./02-nodejs/users.csv', csv)
      res.download('./02-nodejs/users.csv')
    })
  } catch (error) {
    next(error)
  }
})

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Error')
})

app.listen(3000)

/* esta fue la primera solucion que pense pero pude desarrollar una mejor en donde el tiempo es mucho menor */
/* 'use strict'

const express = require('express')
var fs = require('fs').promises;
const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async function(req, res) {
    try {
        await addHeaders();

        const users = await User.find({});

        users.forEach((user, index) => {
            console.log(index)
            addUserInfo(user._id, user.name, user.email);
        });
        res.download('./02-nodejs/users.csv')
    } catch (error) {
        console.log(error)
    }

})

async function addHeaders() {
    try {
      const csvHeaders = 'id,name,email'
      await fs.writeFile('./02-nodejs/users.csv', csvHeaders);
    } catch (error) {
      console.error(`error generando el archivo: ${error.message}`);
    }
}

async function addUserInfo(id, name, email) {
    try {
        const csvLine = `\n${id},${name},${email}`
        await fs.writeFile('./02-nodejs/users.csv', csvLine, { flag: 'a' });
    } catch (error) {
        console.error(`error generando el archivo: ${error.message}`);
    }
}

app.listen(3000)
 */
