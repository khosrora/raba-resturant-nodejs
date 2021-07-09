const Reservation = require('../../models/reservationMDL');

// ERROR SERVER
const { get500 } = require('../errorController');

// HELPER FUNC
const { jalaliMoment } = require('../../helper/jalali');

exports.getReservations = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Reservation.find().countDocuments();
        const reservations = await Reservation.find({ Confirmation: false }).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);

        res.render("admin/reservation", {
            layout: "./layouts/dashLayouts",
            path: "/admin/reservation",
            pageTitle: "پنل مدیریت || رزو های تایید نشده",
            breadCrumb: "رزرو های تایید نشده",
            fullname: req.user.fullname,
            index,
            reservations,
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
exports.getTrueReservations = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Reservation.find().countDocuments();
        const reservations = await Reservation.find({ Confirmation: true }).skip((page - 1) * postPerPage).limit(postPerPage);

        res.render("admin/truereservation", {
            layout: "./layouts/dashLayouts",
            path: "/admin/reservation",
            pageTitle: "پنل مدیریت || رزو های تایید شده",
            breadCrumb: "رزرو های تایید شده",
            fullname: req.user.fullname,
            index,
            reservations,
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

exports.detailReservations = async (req, res) => {
    try {
        const detailReserv = await Reservation.findById(req.params.id);
        res.render("admin/detailReserv", {
            layout: "./layouts/dashLayouts",
            path: "/admin/reservation",
            pageTitle: "پنل مدیریت || اطلاعات رزرو",
            breadCrumb: "اطلاعات رزرو",
            fullname: req.user.fullname,
            jalaliMoment,
            detailReserv
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.deleteReserv = async (req, res) => {
    try {
        await Reservation.findByIdAndRemove(req.params.id)
        res.redirect("/admin/reservations")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.confirmationReserv = async (req, res) => {
    try {
        const reserv = await Reservation.findById(req.params.id);
        reserv.Confirmation = true;

        // ! SMS SEND

        await reserv.save();
        res.redirect("/admin/reservations")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.notConfirmation = async (req, res) => {
    try {
        const reserv = await Reservation.findById(req.params.id);
        reserv.Confirmation = false;
        await reserv.save();
        res.redirect("/admin/truereservations")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
