'use strict'

const express = require('express')
const User = require('./models/User')
const { Transform } = require('stream')

// Setup Express.js app
const app = express()
app
  .route('/users')
  .get(async (req, res) => {
    try {
      const MAX_DOCUMENTS_PER_PAGE = 1000
      const ONE_PAGE = 1
      const { page = ONE_PAGE, size = MAX_DOCUMENTS_PER_PAGE } = req.query

      const parsedPage = Number(page) || page
      let parsedSize = Number(size) || size
      const documentSkipCount = parsedSize * (page - ONE_PAGE)

      if (parsedSize > MAX_DOCUMENTS_PER_PAGE) parsedSize = MAX_DOCUMENTS_PER_PAGE

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', `attachment; filename="users_${parsedPage}.csv"`)

      res.write(`${['Name', 'Email'].join(',')}\n`)

      const transformStream = new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform (user, _, cb) {
          this.push(`${[user.name, user.email].join(',')}\n`)
          cb()
        }
      })

      User.find()
        .skip(documentSkipCount)
        .limit(parsedSize)
        .lean()
        .cursor()
        .pipe(transformStream)
        .pipe(res)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Error')
    }
  })

app.listen(3000)
