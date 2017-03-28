'use strict';

const User = require('../models/User');
const json2csv = require('json2csv');

exports.usersToCsv = function(req, res) {
	User.find({}).exec()
	.then((result)=>{
		json2csv({ data: result, fields: ['name', 'email'] }, (err, csv = '')=>{
			if (err) {
				res.status(500).json({error: err});
			} else {
				res.setHeader('Content-disposition', 'attachment; filename=users.csv');
		    	res.set('Content-Type', 'text/csv');
		    	res.status(200).send(csv);	
			}
		});	
	});
};
