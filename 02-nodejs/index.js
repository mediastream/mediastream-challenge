'use strict'

const express = require('express')
const router = express.Router()
const User = require('./models/User')
const fields = ['name', 'email']
const moment = require('moment')
const json2csv = require('json2csv').parse
const fs = require('fs');
const path = require('path')

// Setup Express.js app
const app = express()

router.get('/csv', function (_, res) {
    User.find({}, function (err, users) {
        if (err) {
          return res.status(500).json({ err })
        }
        else {
          let csv
          try {
            csv = json2csv(users, { fields })
          } catch (err) {
            return res.status(500).json({ err })
          }
          const dateTime = moment().format('YYYYMMDDhhmmss')
          const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
          fs.writeFile(filePath, csv, function (err) {
            if (err) {
              return res.json(err).status(500)
            }
            else {
              setTimeout(function () {
                fs.unlinkSync(filePath)
              }, 30000)
              return res.json("/exports/csv-" + dateTime + ".csv")
            }
          })
    
        }
      })
})

app.use(router)

const port = 3005

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
})
