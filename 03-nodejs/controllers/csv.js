const ExportData = require('../infra/exportToCsv');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.exportToCsv = (req, res) => {
    User
        .find({}, 'name email')
        .then((data) => {
            let filename = ExportData.tocsv(data);
            res.download("./exports/" + filename);

        }).catch(err => res.status(500).send(err))
}