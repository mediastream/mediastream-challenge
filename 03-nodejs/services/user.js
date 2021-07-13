// ====================================================
//      USER SERVICE
// ====================================================

const User = require('../models/User');
const { createCsvFile } = require('../utils/csv');
const path = require('path');

//======================================
//Mostrar todos los usuarios
//======================================
async function getUsers(req, res) {
    try {
        const users = await User.find();
        const csvName = await createCsvFile(users);

        return res.download(path.resolve(__dirname, `../public/${csvName}`), csvName, (err) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    err
                });
            }
        })

    } catch (error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
}

module.exports = {
    getUsers
}