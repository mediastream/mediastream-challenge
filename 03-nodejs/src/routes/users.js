import express from "express";
import User from "../models/User";
import json2csv from "json2csv";


const router = express.Router();

router.get("/", (req, res) => {
    var fields = ['name','email'] ;
    User
    .find({})
    .then(userRecords => {
         var result = json2csv({ data: userRecords, fields: fields });
         res.attachment('users.csv')
         res.setHeader('Content-Type', 'application/text-csv')
         res.end(result)
    })
     .catch(err => res.status(400).json({ errors: err.errors }));
});

export default router;

// //another solution
// const userss =  User.findAndStreamCsv({})
// fs.createWriteStream('users.csv'));
// https://www.npmjs.com/package/mongoose-to-csv