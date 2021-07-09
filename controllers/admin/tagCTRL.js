const Tag = require('../../models/tagMDL');


// ERROR SERVER
const { get500 } = require('../errorController');
// HELPER FUNC
const { jalaliMoment } = require('../../helper/jalali');

exports.getTags = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Tag.find().countDocuments();
        const tags = await Tag.find().skip((page - 1) * postPerPage).limit(postPerPage);

        res.render("admin/tags", {
            layout: "./layouts/dashLayouts",
            path: "/admin/tags",
            pageTitle: "پنل مدیریت || برچسب ها",
            breadCrumb: "برچسب ها",
            fullname: req.user.fullname,
            index,
            tags,
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

exports.getcreateTag = async (req, res) => {
    try {
        res.render("admin/createTags", {
            layout: "./layouts/dashLayouts",
            path: "/admin/reservation",
            pageTitle: "پنل مدیریت || ساخت برچسب",
            breadCrumb: "ساخت برچسب",
            fullname: req.user.fullname,
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.createTag = async (req, res) => {
    const errors = [];
    try {
        // GETBODY
        req.body = { ...req.body }
        // VALIDATION
        await Tag.tagValidat(req.body);

        await Tag.create({
            ...req.body
        })
        res.redirect("/admin/tags")
    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("admin/createTags", {
            layout: "./layouts/dashLayouts",
            path: "/admin/getcreatetag",
            pageTitle: "پنل مدیریت || ساخت برچسب",
            breadCrumb: "ساخت برچسب",
            fullname: req.user.fullname,
            errors
        })
    }
}
exports.deleteTag = async (req, res) => {
    try {
        await Tag.findByIdAndRemove(req.params.id);
        res.redirect("/admin/tags");
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}