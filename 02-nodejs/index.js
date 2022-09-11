'use strict'

const express = require('express')
const fastcsv = require("fast-csv");
const fs = require("fs");
const User = require('./models/User')
// Setup Express.js app
const app = express()

// TODO: everything else

app.get('/users', function (req, res) {

    let ws = fs.createWriteStream("output.csv");
    console.time('omg')
    User.find({}).then((data)=>{
        let toArraay = data.map( data => [data.name,data.email] )
        fastcsv
        .write( toArraay )
        .on("finish", function() {
    
            fs.createReadStream('output.csv').pipe(res);
            console.timeEnd('omg')

        })
        .on('error',function(){
            console.log('error')
        })
        .pipe(ws);
    })

})

app.listen(3000, () => {
    console.log('servidor corriendo en puerto 3000')
})
