const json2csv = require('json2csv').parse;
const User = require('../models/User');

/**
 * Get users from database and stream file
 *
 * It's worth noting that this is not the best practice when we talk about a system in production,
 * since the response time of the request can be very high, depending on the size of the database,
 * other strategies have to be applied, such as a BD in memory ( redis), an asynchronous processing,
 * a preprocessing of the file, or something similar, as the case may be.
 *
 * @param req
 * @param res
 *
 * @returns {Promise<*|Promise<any>>}
 */
const exportsUsersToCsv = async (req, res) => {
	try {
		// Get users from database
		const users = await User.find({});
		// Fields to fill on csv file
		const fields = [ 'name', 'email' ];
		// Build csv file
		const csv = json2csv(users, { fields });
		// Set headers
		res.set({
			'Content-Type': 'text/csv',
			'Content-Disposition': `attachment; filename=users-database-${Date.now()}.csv`,
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
		});
		// Send file
		res.send(csv);
	} catch (err) {
		// Send error
		return res.status(500).json({ err });
	}
};

module.exports = {
	exportsUsersToCsv
};
