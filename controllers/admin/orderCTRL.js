const Cards = require('../../models/cardMDL');
const Personal = require('../../models/personalMDL');



// ERROR SERVER
const { get500 } = require('../errorController');




exports.getOrders = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Cards.find().countDocuments();
        const cards = await Cards.find().sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage).populate("user");

        res.render("admin/orders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/orders",
            pageTitle: "صفحه اول || سفارشات",
            breadCrumb: "سفارشات",
            fullname: req.user.fullname,
            index,
            cards,
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

exports.detailOrders = async (req, res) => {
    try {
        const card = await Cards.findById(req.params.id).populate("user");
        const personal = await Personal.findOne({ user: card.user.id }).populate("user");

        res.render("admin/detailorders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/detailorders",
            pageTitle: "صفحه اول || جزئیات سفارش",
            breadCrumb: "جزئیات سفارش",
            fullname: req.user.fullname,
            card,
            personal
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.newOrders = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Cards.find().countDocuments();
        const cards = await Cards.find(
            { $and: [{ send: false }, { show: true }] }
        ).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage).populate("user");

        res.render("admin/newOrders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/newOrders",
            pageTitle: "صفحه اول || سفارشات جدید",
            breadCrumb: "سفارشات جدید",
            fullname: req.user.fullname,
            cards,
            index,
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

exports.oldOrders = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Cards.find().countDocuments();
        const cards = await Cards.find(
            { $and: [{ send: true }, { show: true }] }
        ).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage).populate("user");

        res.render("admin/oldOrders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/oldOrders",
            pageTitle: "صفحه اول || سفارشات ارسال شده",
            breadCrumb: "سفارشات ارسال شده",
            fullname: req.user.fullname,
            cards,
            index,
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

exports.notSee = async (req, res) => {
    try {
        const card = await Cards.findById(req.params.id)
        card.show = false;
        await card.save();
        res.redirect("/admin/oldOrders")
    } catch (err) {
        console.log(err);
        get500(req, res)
    }
}
exports.send = async (req, res) => {
    try {
        const card = await Cards.findById(req.params.id)
        card.send = true;
        await card.save();
        res.redirect("/admin/newOrders")
    } catch (err) {
        console.log(err);
        get500(req, res)
    }
}
exports.notSend = async (req, res) => {
    try {
        const card = await Cards.findById(req.params.id)
        card.send = false;
        await card.save();
        res.redirect("/admin/oldOrders")
    } catch (err) {
        console.log(err);
        get500(req, res)
    }
}

exports.handleSearch = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Cards.find({
            $text: { $search: req.body.search }
        }).countDocuments();
        const cards = await Cards.find({
            $text: { $search: req.body.search }
        }).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage).populate("user");

        res.render("admin/orders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/search",
            pageTitle: "صفحه اول || نتایج جست و جو ",
            breadCrumb: "نتایج جست و جو ",
            fullname: req.user.fullname,
            index,
            cards,
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