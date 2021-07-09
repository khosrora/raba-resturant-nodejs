const Users = require('../../models/userMDL');
const Personal = require('../../models/personalMDL');
const Reservation = require('../../models/reservationMDL');
const Opinion = require('../../models/opinionMDL');
const Cards = require('../../models/cardMDL');
const { unlink } = require('fs/promises');
const appRoot = require('app-root-path');

// ERROR SERVER
const { get500 } = require('../errorController');

// HELPER FUNC
const { jalaliMoment } = require('../../helper/jalali');

exports.indexPage = async (req, res) => {
    try {
        const users = await Users.find({ isAdmin: false });
        const cards = await Cards.find({ $and: [{ status: true }, { send: false }] });
        const reservation = await Reservation.find({ Confirmation: false });
        const opinion = await Opinion.find();

        res.render("admin/index", {
            layout: "./layouts/dashLayouts",
            path: "/auth/login",
            pageTitle: "صفحه اول || مدیریت",
            breadCrumb: "صفحه اول",
            fullname: req.user.fullname,
            lengthUser: users.length,
            cardsAdmins: cards.length,
            lengthReservation: reservation.length,
            lengthOpinion: opinion.length
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}



exports.getUsers = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Users.find().countDocuments();
        const users = await Users.find({ isAdmin: false }).skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("admin/users", {
            layout: "./layouts/dashLayouts",
            path: "/auth/login",
            pageTitle: "پنل مدیریت || کاربران",
            breadCrumb: "کاربران",
            fullname: req.user.fullname,
            index,
            users,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getAdmins = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Users.find().countDocuments();
        const users = await Users.find({ isAdmin: true }).skip((page - 1) * postPerPage).limit(postPerPage);;
        res.render("admin/admins", {
            layout: "./layouts/dashLayouts",
            path: "/auth/login",
            pageTitle: "پنل مدیریت || مدیران",
            breadCrumb: "مدیران",
            fullname: req.user.fullname,
            index,
            users,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.detailUsers = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.render("admin/user", {
            layout: "./layouts/dashLayouts",
            path: "/auth/login",
            pageTitle: "پنل مدیریت || اطلاعات کاربر",
            breadCrumb: "اطلاعات کاربر",
            fullname: req.user.fullname,
            user,
            jalaliMoment
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.getperonalUsers = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Personal.find().countDocuments();
        const personals = await Personal.find().skip((page - 1) * postPerPage)
            .limit(postPerPage).populate("user");

        res.render("admin/personalInformations", {
            layout: "./layouts/dashLayouts",
            path: "/admin/peronalUsers",
            pageTitle: "پنل مدیریت || اطلاعات شخصی  کاربران",
            breadCrumb: "اطلاعات  شخصی کاربران",
            fullname: req.user.fullname,
            index,
            personals,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.peronalUsers = async (req, res) => {
    try {
        const personalUser = await Personal.findById(req.params.id).populate("user");
        res.render("admin/personalInformation", {
            layout: "./layouts/dashLayouts",
            path: "/auth/login",
            pageTitle: "پنل مدیریت || اطلاعات کاربر",
            breadCrumb: "اطلاعات کاربر",
            fullname: req.user.fullname,
            personalUser
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        const personal = await Personal.findOne({ user: req.params.id })
        await Users.findByIdAndRemove(req.params.id);
        unlink(`${appRoot}/public/uploads/images/users/${personal.image}`)
        personal.remove();
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.setAdmin = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        user.isAdmin = true;
        await user.save();
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.setUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        user.isAdmin = false;
        await user.save();
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

