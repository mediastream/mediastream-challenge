const express = require('express');
const router = express.Router();
const controller = require('../controllers/csv');

/* GET . */
router.get('/users', controller.exportToCsv);

module.exports = router;