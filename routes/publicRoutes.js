const { Router } = require('express');
const router = new Router();


//! CTRL
const publicCTRL = require('../controllers/publicCTRL');

// !MIDDLEWARE
const { auth } = require('../middleware/auth');


// ? DESC home page
// ? GET /
router.get("/", auth, publicCTRL.index)
// ? DESC menu page
// ? GET /menu
router.get("/menu", auth, publicCTRL.menuPage)
// ? DESC contact page
// ? GET /contact
router.get("/contact", auth, publicCTRL.contactPage)
// ? DESC about page
// ? GET /about
router.get("/about", auth, publicCTRL.aboutPage)
// ? DESC reservation page
// ? GET /reservation
router.get("/reservation", auth, publicCTRL.getreservationPage)
// ? DESC reservation page
// ? GET /reservation
router.get("/blogs", auth, publicCTRL.blogsPage)
// ? DESC reservation page
// ? GET /reservation
router.get("/blogsingle/:id", auth, publicCTRL.blogsingle)
// ! DESC reservation page
// ! POST /reservation
router.post("/reservation", auth, publicCTRL.reservationPage)




module.exports = router;
