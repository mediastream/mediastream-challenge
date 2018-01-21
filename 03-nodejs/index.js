'use strict';
var colors = require('colors');

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

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');

// Setup Express.js app
const app = express();

console.log(`
---------------------------------
Architecture style, patterns and other decisions:
---------------------------------

1. Clean Architecture based approach (not strict, few rules ignored)
   Ref: https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html

2. MVP "variation": Inspired on Model View Presenter (MVP)
   My view, actually, is not totally passive, but what matters here is to have more separation 
   to improve code testability. The "inspiration" on a well known pattern turn this code 
   easier to be understood.

3. Repository Pattern
   Ref: https://msdn.microsoft.com/en-us/library/ff649690.aspx

4. Dependency Injection
   No 3rd party library used. Just few classes is ok to handle by manually.

5. We have Tests!
   Just unit tests, no integration with database.
   Please, check "03-nodejs/test"
`.yellow);
app.use('/users', require('./module/users.module').middleware);

app.listen(3000);
