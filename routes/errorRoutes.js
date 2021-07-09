const { Router } = require('express');
const router = new Router();


// !CTRL
const errorCTRL = require('../controllers/errorController');

// !MIDDLEWARE
const { auth } = require('../middleware/auth');

// ? DESC auth page
// ? GET /login
router.get("/", auth, errorCTRL.get404);

module.exports = router;