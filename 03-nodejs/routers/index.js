const router = require("express").Router();
const User = require('../controllers/user');

// *** user routers
router.get("/users", User.convertToCsv);

module.exports = router;
