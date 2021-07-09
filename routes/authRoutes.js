const { Router } = require('express');
const router = new Router();

// !CTRL
const authCTRL = require('../controllers/authCTRL.js');

// !MIDDLEWARE
const { isLogged, auth } = require('../middleware/auth');

// ? DESC auth page
// ? GET /login
router.get("/login", isLogged, auth, authCTRL.loginPage)

// ? DESC auth page
// ? GET /register
router.get("/register", isLogged, auth, authCTRL.registerPage)

// ? DESC auth page
// ? get /authlogout
router.get("/logout", authCTRL.logoutUser)

// ! DESC auth page
// ! post /auth/register
router.post("/register", auth, authCTRL.registerUser)

// ! DESC auth page
// ! post /auth/login
router.post("/login", auth, authCTRL.loginUser)



// ? DESC forget-paass
// ? GET /register
// router.get("/forget-password", isLogged, auth, authCTRL.getForgetPassword)

// ? DESC forget-paass
// ? post /register
// router.post("/forget-password", isLogged, auth, authCTRL.forgetPassword)





module.exports = router;
