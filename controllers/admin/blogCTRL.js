const Blog = require('../../models/blogMDL');
const Tag = require('../../models/tagMDL');

const { unlink } = require('fs/promises');

const shortId = require('shortid');
const appRoot = require('app-root-path');
const sharp = require('sharp');

// ERROR SERVER
const { get500 } = require('../errorController');

// *HELPER
const { jalaliMoment } = require('../../helper/jalali');

exports.getBlogs = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Blog.find().countDocuments();
        const blogs = await Blog.find().sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);

        res.render("admin/blogs", {
            layout: "./layouts/dashLayouts",
            path: "/admin/blogs",
            pageTitle: "پنل مدیریت || بلاگ ها",
            breadCrumb: "بلاگ ها",
            fullname: req.user.fullname,
            index,
            blogs,
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


exports.getcreateBlog = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.render("admin/createBlogs", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createBlogs",
            pageTitle: "پنل مدیریت || ساخت بلاگ",
            breadCrumb: "ساخت بلاگ",
            fullname: req.user.fullname,
            tags,
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.createBlog = async (req, res) => {
    const errors = [];
    const tags = await Tag.find();
    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/blogs/${fileName}`
    try {
        // GET BODY
        req.body = { ...req.body, image };

        // VALIDATION
        await Blog.blogsValidat(req.body);
        // SIZE
        await sharp(image.data).jpeg({ quality: 100 })
            .toFile(uploadPath).catch(err => console.log(err))

        await Blog.create({
            ...req.body, user: req.user.id, image: fileName
        })
        res.redirect("/admin/blogs");
    } catch (err) {
        console.log(err);
        errors.push({
            message: err.message
        })
        return res.render("admin/createBlogs", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createBlogs",
            pageTitle: "پنل مدیریت || ساخت بلاگ",
            breadCrumb: "ساخت بلاگ",
            fullname: req.user.fullname,
            tags,
            errors
        })
    }
}


exports.detailblogs = async (req, res) => {

    try {
        const deatilBlog = await Blog.findById(req.params.id).populate("user")
        res.render("admin/detailBlogs", {
            layout: "./layouts/dashLayouts",
            path: "/admin/blogs",
            pageTitle: "پنل مدیریت || جزییات بلاگ",
            breadCrumb: "جزئیات بلاگ",
            fullname: req.user.fullname,
            jalaliMoment,
            deatilBlog,
            jalaliMoment
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
exports.deleteblogs = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.id)
        unlink(`${appRoot}/public/uploads/images/blogs/${blog.image}`)
        blog.remove();
        res.redirect("/admin/blogs")
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}
