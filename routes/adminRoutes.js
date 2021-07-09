const { Router } = require('express');
const router = new Router();

// !CTRL
const indexCTRL = require('../controllers/admin/indexCTRL.js');
const reservCTRL = require('../controllers/admin/reservCTRL.js');
const opinionCTRL = require('../controllers/admin/opinionCTRL.js');
const tagCTRL = require('../controllers/admin/tagCTRL.js');
const blogCTRL = require('../controllers/admin/blogCTRL.js');
const foodCTRL = require('../controllers/admin/foodCTRL.js');
const orderCTRL = require('../controllers/admin/orderCTRL');

// !MIDDLEWARE
const { authenticated, isAdmin } = require('../middleware/auth');

// ? DESC home page
// ? GET admin/
router.get("/", authenticated, isAdmin, indexCTRL.indexPage)

// !USERS
// * users
// ? DESC getUsers
// ? GET /admin/users
router.get("/users", authenticated, isAdmin, indexCTRL.getUsers)
// * admins
// ? DESC getAdmins
// ? GET /admin/admins
router.get("/admins", authenticated, isAdmin, indexCTRL.getAdmins)
// * detailUsers
// ? DESC detailUsers
// ? GET /admin/detail-users
router.get("/detail-users/:id", authenticated, isAdmin, indexCTRL.detailUsers)
// * detailUsersPersonal
// * personal
// ? DESC getAdmins
// ? GET /admin/peronalUsers
router.get("/peronalUsers", authenticated, isAdmin, indexCTRL.getperonalUsers)
// ? DESC detailUsers
// ? GET /admin/detail-users
router.get("/peronalUsers/:id", authenticated, isAdmin, indexCTRL.peronalUsers)
// ? DESC delete Users
// ? GET /admin/deleteUsers
router.get("/delete-users/:id", authenticated, isAdmin, indexCTRL.deleteUsers)
// ? DESC set Admin
// ? GET /admin/set Admin
router.get("/setAdmin/:id", authenticated, isAdmin, indexCTRL.setAdmin)
// ? DESC setUser
// ? GET /admin/setUser
router.get("/setUser/:id", authenticated, isAdmin, indexCTRL.setUser)


// ! ORDERS
// ? DESC getOrders
// ? GET /admin/getOrders
router.get("/orders", authenticated, isAdmin, orderCTRL.getOrders)

// ? DESC detailorders
// ? GET /admin/detailorders
router.get("/detailorders/:id", authenticated, isAdmin, orderCTRL.detailOrders)

// ? DESC newOrders
// ? GET /admin/newOrders
router.get("/newOrders", authenticated, isAdmin, orderCTRL.newOrders)

// ? DESC oldOrders
// ? GET /admin/oldOrders
router.get("/oldOrders", authenticated, isAdmin, orderCTRL.oldOrders)

// ? DESC oldOrders
// ? GET /admin/oldOrders
router.get("/notSee/:id", authenticated, isAdmin, orderCTRL.notSee)

// ? DESC oldOrders
// ? GET /admin/oldOrders
router.get("/sendTrue/:id", authenticated, isAdmin, orderCTRL.send)

// ? DESC oldOrders
// ? GET /admin/oldOrders
router.get("/sendFalse/:id", authenticated, isAdmin, orderCTRL.notSend)

// ? DESC search
// ? post /admin/search
router.post("/search", authenticated, isAdmin, orderCTRL.handleSearch)



// !reservations
// ? DESC reservations
// ? GET /admin/reservations
router.get("/reservations", authenticated, isAdmin, reservCTRL.getReservations)

// ? DESC detail reservations
// ? GET /admin/detailreservation
router.get("/truereservations", authenticated, isAdmin, reservCTRL.getTrueReservations)

// ? DESC detail reservations
// ? GET /admin/detailreservation
router.get("/detailreservation/:id", authenticated, isAdmin, reservCTRL.detailReservations)

// ? DESC deletereservation
// ? GET /admin/deletereservation
router.get("/deletereservation/:id", authenticated, isAdmin, reservCTRL.deleteReserv)

// ? DESC Confirmation reserv
// ? GET /admin/Confirmation
router.get("/confirmation/:id", authenticated, isAdmin, reservCTRL.confirmationReserv)

// ? DESC notConfirmation
// ? GET /admin/notConfirmation
router.get("/notConfirmation/:id", authenticated, isAdmin, reservCTRL.notConfirmation)

// !opinion

// ? DESC opinion
// ? GET /admin/opinion
router.get("/opinion", authenticated, isAdmin, opinionCTRL.getOpinionPage)

// ? DESC detailOpinionPage
// ? GET /admin/detailOpinionPage
router.get("/detailOpinionPage/:id", authenticated, isAdmin, opinionCTRL.detailOpinionPage)

// ? DESC detailOpinionPage
// ? GET /admin/detailOpinionPage
router.get("/deleteopinion/:id", authenticated, isAdmin, opinionCTRL.deleteOpinion)

// ? DESC setshow
// ? GET /admin/setshow
router.get("/setshow/:id", authenticated, isAdmin, opinionCTRL.showOpinion)

// ? DESC setfalse
// ? GET /admin/setfalse
router.get("/setfalse/:id", authenticated, isAdmin, opinionCTRL.hideOpinion)

//! Tags

// ? DESC tag
// ? GET /admin/tags
router.get("/tags", authenticated, isAdmin, tagCTRL.getTags)
// ? DESC getcreatetag
// ? get /admin/getcreatetag
router.get("/getcreatetag", authenticated, isAdmin, tagCTRL.getcreateTag)
// ? DESC createtag
// ? post /admin/createtag
router.post("/createtag", authenticated, isAdmin, tagCTRL.createTag)
// ? DESC deleteTag
// ? get /admin/deleteTag
router.get("/deleteTag/:id", authenticated, isAdmin, tagCTRL.deleteTag)

// !Blogs
// ? DESC createBlogs
// ? GET /admin/createBlogs
router.get("/blogs", authenticated, isAdmin, blogCTRL.getBlogs)

// ? DESC createBlogs
// ? GET /admin/createBlogs
router.get("/createBlogs", authenticated, isAdmin, blogCTRL.getcreateBlog)

// ? DESC createBlog
// ? GET /admin/createBlog
router.post("/createBlogs", authenticated, isAdmin, blogCTRL.createBlog)

// ? DESC detailblogs
// ? GET /admin/detailblogs
router.get("/detailblogs/:id", authenticated, isAdmin, blogCTRL.detailblogs)

// ? DESC deleteblogs
// ? GET /admin/deleteblogs
router.get("/deleteblogs/:id", authenticated, isAdmin, blogCTRL.deleteblogs)



//! FOODS
// ? DESC getfoods
// ? get /admin/getfoods
router.get("/foods", authenticated, isAdmin, foodCTRL.getfoods)

// ? DESC getcreateFood
// ? get /admin/getcreateFood
router.get("/createFood", authenticated, isAdmin, foodCTRL.getcreateFood)

// ? DESC createFood
// ? post /admin/createFood
router.post("/createFood", authenticated, isAdmin, foodCTRL.createFood)

// ? DESC detailfood
// ? post /admin/detailfood
router.get("/detailfood/:id", authenticated, isAdmin, foodCTRL.detailFood)


// ? DESC deletefood
// ? post /admin/deletefood
router.get("/deletefood/:id", authenticated, isAdmin, foodCTRL.deleteFood)

// ? DESC setTrueSpecial
// ? get /admin/setTrueSpecial
router.get("/setTrueSpecial/:id", authenticated, isAdmin, foodCTRL.special)

// ? DESC setFalseSpecial
// ? get /admin/setFalseSpecial
router.get("/setFalseSpecial/:id", authenticated, isAdmin, foodCTRL.noSpecial)

// ? DESC editFood
// ? get /admin/editFood
router.get("/editFood/:id", authenticated, isAdmin, foodCTRL.getEditFood)
// ? DESC editFood
// ? get /admin/editFood
router.post("/editFood/:id", authenticated, isAdmin, foodCTRL.editFood)



module.exports = router;
