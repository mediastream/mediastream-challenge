const { exportsUsersToCsv } = require('../controllers/users');

const routes = (app) => {
	// Users route to export users to csv file
	app.route('/users').get(exportsUsersToCsv);

	// Index Route
	app.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome to Mediastream Challenge!!!' });
	});

	// 404 route
	app.use(({ originalUrl, method }, res) => {
		res.status(404).send({ err: `${originalUrl} by ${method} method not found` });
	});
};

module.exports = routes;
