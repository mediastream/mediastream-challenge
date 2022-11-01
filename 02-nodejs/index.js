'use strict'

const express = require('express')

const User = require('./models/User')

/**
 * CHALLENGE
 * We need to create a route that downloads the entire database to a .csv file.
 *
 * WARNING: Database contains hundreds of entities and our production server is quite small. Make sure the solution to implement can perform with little resources.
 *
 * Preparation
 * 1. Make sure to have an instance of MongoDB running at mongodb://localhost
 * 2. Run node utils/seed.js to populate the database
 *
 * Tasks
 * 1. Create GET /users endpoint to stream the CSV response
 */

// Setup Express.js app
const app = express()

/**
 * Solution explain:
 *   Part 1. Query to mongoose with instructions:
 *     - No assign every record to Mongoose Document Model before return, JS object directly
 *     - No fit in memory the total of result, pass one-at-a-time directly
 *   Part 2. No assign any result in JS var, every result write directly in http response
 *
 *   Complexity:
 *     - time:  O(n) - linear (n=100000) // Part 1
 *     - space: O(1) - linear (n=0)      // Part 2
 */
app.get(
  '/users',

  async (req, res) => {
    try {
      // SET HEADERS
      // Set mime-type for csv plain text (variable length and special chars)
      res.setHeader('Content-Encoding', 'UTF-8')

      // Set mime-type for csv plain text
      res.setHeader('Content-Type', 'text/csv; charset=UTF-8')

      // Set disposition for client browser (download),
      res.setHeader('Content-Disposition', 'attachment; filename=download-users.csv')

      // Get all records from Mongoose model
      await User.find()

        // Return records are plain javascript objects,
        // not Mongoose Documents
        .lean()

        // Process one-at-a-time because the aggregation
        // result is too big to fit into memory
        .cursor()
        .on('data', (user) => {
          // Write one by one record directly in response
          res.write(`${user.name},${user.email}\n`)
        })

        .on('end', () => {
          // Advice finish response to client browser
          res.end()
        })
    } catch (error) {
      // If error, return message with error code
      res.status(500).send('Internal Error').end()
    }
  }
)

app.listen(3000)
