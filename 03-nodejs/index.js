'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const os = require('os');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const User = require('./models/User');
const { resolve } = require('path');

// Setup Express.js app
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  try {
    res.status(200)
      .send(
        "Mediastream-challenge"
      );

  } catch (error) {
    next(error);
  }
});

app.get('/users', downloadUsers);


function csvTransform(obj) {
  return `${Object.values(obj).join(", ")}${os.EOL}`
}

async function downloadUsers(req, res, next) {
  try {
    const csv = './tmp/test.csv';
    const initTime = Date.now();

    const stream = User.find().stream({ transform: csvTransform })
    const output = await fs.createWriteStream("./tmp/test.csv")

    await stream.pipe(output).on("finish", () => {
      const ElapsedTime = Date.now() - initTime;
      console.log(`Execution ended. Elapsed time: ${(ElapsedTime / 1000)} seconds`);
      res.download(csv)
    });

  } catch (error) {
    console.log("err", error)
  }
}

app.listen(3000);
