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



//recibe peticion get /Users
app.get('/users',function(req,res,next){
	//cabeceras de respuetsa
	res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
	res.setHeader('Content-type', 'text/csv');
	//busco todos los registors
	User.find({},function(err,resm){
		if(!err){
			let n=resm.length;
			for(var i=0; i<n; i++){
				//los envío uno  a unop
				res.write(resm[i].name+","+resm[i].email+"\r\n");
			}
			//finaliza la respuesta
			res.end();
		}
	});

});


// TODO

app.listen(3000);
