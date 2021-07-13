// ====================================================
//      Routes API: User
// ====================================================

const express = require('express');
const userController = require('../controllers/user');
const api = express.Router();

// =================================
// Todos los usuarios
// =================================
api.get('/', userController.getUsers);

module.exports = api;