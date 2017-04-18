
const express = require('express');
let json2csv = require('json2csv');
let router = express.Router()
const User = require('../models/User')

router.route('/')
  .get((req,res)=>{
    let docs = []
    let fields = ['id', 'name', 'email'];
    let fieldNames = ['Id', 'Name', 'Email'];

    User.find({}, function(error, users){
      users.forEach(function(user) {
         docs.push(user);
       });
    }).then(function(){

      json2csv({ data: docs, fields: fields, fieldNames: fieldNames });
      res.attachment('user.csv');
      res.status(200).send("File was generated");
    })

  })


module.exports = router
