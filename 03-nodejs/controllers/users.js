var mongoose = require('mongoose');
var User  = mongoose.model('User');
var json2csv = require('json2csv');
const _ = require('lodash');

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
	    if(err) res.send(500, err.message);

	    data = "";

	    _.forEach(users, function( user ) {

			data = data + user._id +','+ user.name + ',' + user.email + '\n';
		});

	    res.attachment('database.csv');
		res.status(200).send(data);

	});
};