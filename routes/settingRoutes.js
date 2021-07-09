const { Router } = require('express');;
const router = new Router();

// !CTRL
const settingCTRL = require('../controllers/admin/settingCTRL.js');
// !MIDDLEWARE
const { authenticated, isAdmin } = require('../middleware/auth');

//! homePage
// ? DESC getSliders
// ? GET admin/setting/getSliders
router.get("/homeSliders", authenticated, isAdmin, settingCTRL.getSliders)

// ? DESC home page
// ? GET admin/setting/slider
router.get("/slider", authenticated, isAdmin, settingCTRL.getsliderHomePage)

// ? DESC createSlider
// ? post admin/setting/createSlider
router.post("/slider", authenticated, isAdmin, settingCTRL.createSlider)

// ? DESC createSlider
// ? get admin/setting/createSlider
router.get("/detailslider/:id", authenticated, isAdmin, settingCTRL.detailSlider)

// ? DESC createSlider
// ? get admin/setting/createSlider
router.get("/deleteslider/:id", authenticated, isAdmin, settingCTRL.deleteSlider)

// ? DESC createSlider
// ? get admin/setting/createSlider
router.get("/setShow/:id", authenticated, isAdmin, settingCTRL.showSlider)

// ? DESC createSlider
// ? get admin/setting/createSlider
router.get("/setFalse/:id", authenticated, isAdmin, settingCTRL.hideSlider)


// ! CONTACT US

// ? DESC contactsPage
// ? get admin/setting/contactsPage
router.get("/contactsPage", authenticated, isAdmin, settingCTRL.contactsPage)

// ? DESC createcontact
// ? get admin/setting/createcontact
router.get("/createcontact", authenticated, isAdmin, settingCTRL.getcreatecontact)

// ? DESC createcontact
// ? post admin/setting/createcontact
router.post("/createcontact", authenticated, isAdmin, settingCTRL.createcontact)

// ? DESC createcontact
// ? post admin/setting/createcontact
router.get("/detailcontact/:id", authenticated, isAdmin, settingCTRL.detailcontact)

// ? DESC createcontact
// ? post admin/setting/createcontact

router.get("/deletecontact/:id", authenticated, isAdmin, settingCTRL.deletecontact)
// ? DESC createcontact
// ? post admin/setting/createcontact

router.get("/setShowcontact/:id", authenticated, isAdmin, settingCTRL.showContact)
// ? DESC createcontact
// ? post admin/setting/createcontact
router.get("/setFalsecontact/:id", authenticated, isAdmin, settingCTRL.hideContact)

// !ABOUT 
// ? DESC aboutsPage
// ? post admin/setting/aboutsPage
router.get("/aboutsPage", authenticated, isAdmin, settingCTRL.aboutsPage)

// ? DESC createabout
// ? post admin/setting/createabout
router.get("/createabout", authenticated, isAdmin, settingCTRL.getcreateabout)

// ? DESC createabout
// ? post admin/setting/createabout

router.post("/createabout", authenticated, isAdmin, settingCTRL.createabout)

// ? DESC createabout
// ? get admin/setting/createabout
router.get("/detailabout/:id", authenticated, isAdmin, settingCTRL.detailabout)

// ? DESC createabout
// ? get admin/setting/createabout
router.get("/deleteabout/:id", authenticated, isAdmin, settingCTRL.deleteabout)

// ? DESC setShowabout
// ? get admin/setting/setShowabout
router.get("/setShowabout/:id", authenticated, isAdmin, settingCTRL.Showabout)

// ? DESC setFalseabout
// ? get admin/setting/setFalseabout
router.get("/setFalseabout/:id", authenticated, isAdmin, settingCTRL.hideabout)




module.exports = router;