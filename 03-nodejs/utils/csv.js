const ObjectsToCsv = require('objects-to-csv');


// If you use "await", code must be inside an asynchronous function:
async function createCsvFile(data) {
    const usersToFile = data.map((user) => user._doc)
    const csv = new ObjectsToCsv(usersToFile);
    // Save to file:
    await csv.toDisk('./03-nodejs/public/test.csv');

    return 'test.csv'
};

module.exports = {
    createCsvFile
}