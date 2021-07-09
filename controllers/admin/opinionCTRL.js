const Opinion = require('../../models/opinionMDL');
const { unlink } = require('fs/promises');
const appRoot = require('app-root-path');

// ERROR SERVER
const { get500 } = require('../errorController');

// HELPER FUNC
const { jalaliMoment } = require('../../helper/jalali');


exports.getOpinionPage = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Opinion.find().countDocuments();
        const opinions = await Opinion.find().sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);;
        res.render("admin/opinions", {
            layout: "./layouts/dashLayouts",
            path: "/admin/opinions",
            pageTitle: "انتقادات و پیشنهادات",
            breadCrumb: "انتقادات و پیشنهادات",
            fullname: req.user.fullname,
            opinions,
            index,
            jalaliMoment,
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
exports.detailOpinionPage = async (req, res) => {
    try {
        const opinion = await Opinion.findById(req.params.id);
        res.render("admin/opinion", {
            layout: "./layouts/dashLayouts",
            path: "/admin/opinion",
            pageTitle: "انتقادات و پیشنهادات",
            breadCrumb: "انتقادات و پیشنهادات",
            fullname: req.user.fullname,
            opinion,
            jalaliMoment
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.deleteOpinion = async (req, res) => {
    try {
        await Opinion.findByIdAndRemove(req.params.id);
        res.redirect("/admin/opinion");
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.showOpinion = async (req, res) => {
    try {
        const opinion = await Opinion.findById(req.params.id);
        opinion.show = true;
        await opinion.save();
        res.redirect("/admin/opinion")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.hideOpinion = async (req, res) => {
    try {
        const opinion = await Opinion.findById(req.params.id);
        opinion.show = false;
        await opinion.save();
        res.redirect("/admin/opinion")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
