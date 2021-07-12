// ====================================================
//      Service User
// ====================================================

const serviceUser = require('../services/user');

//======================================
//Mostrar todos los usuarios
//======================================
async function getUsers(req, res) {
    return serviceUser.getUsers(req, res);
}

module.exports = {
    getUsers
}