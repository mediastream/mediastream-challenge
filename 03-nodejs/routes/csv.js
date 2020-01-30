const express = require('express');
const router = express.Router();
const controller = require('../controllers/csv');

/* GET . */
router.get('/export/csv', controller.exportToCsv);

module.exports = router;