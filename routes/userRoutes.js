const { Router } = require('express');
const router = new Router();


//! CTRL
const userCTRL = require('../controllers/userCTRL.js');

// !MIDDLEWARE
const { auth, isUser, authenticated } = require('../middleware/auth');


// ? DESC user Dashboard
// ? get /user/home
router.get("/home", auth, authenticated, isUser, userCTRL.homeDashboard);

// ? DESC user Dashboard
// ? get /user/detailuser
router.get("/detailuser", auth, authenticated, isUser, userCTRL.getdetailUser);

// ! DESC user detailuser
// ! post /user/detailuser
router.post("/detailuser", auth, authenticated, isUser, userCTRL.detailUser);

// ! DESC user delete detailuser
// ! delete /user/detailuser
router.get("/detailuser/:id", auth, authenticated, isUser, userCTRL.deleteDetailUser);


// ? DESC user opinionuser
// ? get /user/detailuser
router.get("/opinionuser", auth, authenticated, isUser, userCTRL.getOpinionUser);

// ! DESC user opinionuser
// ! post /user/detailuser
router.post("/opinionuser", auth, authenticated, isUser, userCTRL.OpinionUser);

// ? DESC user opinionuser
// ? get /user/detailuser
router.get("/card", auth, authenticated, isUser, userCTRL.getCardPage)

// ? DESC user payment
// ? get /user/payment
router.post("/payment", auth, authenticated, isUser, userCTRL.payment)

// ? DESC user Verifypayment
// ? get /user/Verifypayment
router.get("/Verifypayment", auth, authenticated, isUser, userCTRL.Verifypayment)


// ? DESC Orders page
// ? GET /Orders page
router.get("/orderPage", auth, userCTRL.orderPage)

// ? DESC Orders page
// ? GET /Orders page
router.get("/orderPage/:id", auth, userCTRL.detailOrderPage)


module.exports = router;
