module.exports = function (app) {

	var User = require('../models/User.js'),
		json2csv = require('json2csv'),
		fs = require('fs');

	// GET solicita todos los usuarios a la base de datos en mongo y luego los almacena en un archivo .csv
	retrieveUsers = function (req, res) {
		User.find(function (err, users) {
			if (!err) {
				console.log('GET /users')
				json2csv({ data: users, fields: ['_id', '__v', 'name', 'email'] }, function (err, csv) {
					if (!err) {
						fs.writeFile('users.csv', csv, function (err) {
							console.log('usuarios almacenados');
							res.send("Usuarios almacenados");
						});
					} else {
						console.log('error: ' + err);
					}
				});
			} else {
				console.log('error: ' + err);
			}
		});
	};

	// enlace a ruta
	app.get('/users', retrieveUsers);

}