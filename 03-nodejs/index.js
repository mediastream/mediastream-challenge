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

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';
    var head = array[0];
    
    for (var index in array[0]) {
      line += index + ',';
    }
    line = line.slice(0, -1);
    str += line + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          line += array[i][index] + ',';
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;   
}
app.get('/users', (req, res)=>{
    User.find({}, function(err, users){
        if(err) throw err;
        var json = JSON.stringify(users)
        var data = JSON2CSV(json);
        fs.writeFile('users.csv',data,function(err){
            if(err) console.log(err);
            res.download('./users.csv');
        })
    });
});
app.listen(3000);
