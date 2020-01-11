const express = require('express');
const router = express.Router();


router.get('/users',(req,res)=>{
    eval('var obj='+req.query.q);
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("mediastream-challenge");
         query = obj;
         dbo.collection("users").find(query).toArray(function(err, result) {
             if (err) throw err;
             res.json(result)
             db.close();
         });
     });
})


module.exports=router;