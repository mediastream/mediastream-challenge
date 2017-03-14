const express 		= require("express");
const User 			= require("../models/User.js");
const csv 			= require('csv-express');
const fs 	= require('fs');
const router 		= express.Router();

router.get('/users', function(req, res){
	User.find({}, function(err, users){
		if(err) throw err;		
		if(users.length > 1)
		{
			let obj = [];
			for(i in users)
			{
				obj.push({'id': users[i].id, 'name': users[i].name, 'email':users[i].email});
			}
			res.csv(obj);
			
		} else {
			res.render("index", {data: "No users registered yet!!!"});
		}
	}).pretty();
});

module.exports = router;