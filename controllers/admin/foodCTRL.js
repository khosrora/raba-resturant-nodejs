const Food = require('../../models/foodMDL');

const { unlink } = require('fs/promises');

const shortId = require('shortid');
const appRoot = require('app-root-path');
const sharp = require('sharp');

// ERROR SERVER
const { get500 } = require('../errorController');

exports.getfoods = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await Food.find().countDocuments();
        const foods = await Food.find().sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("admin/foods", {
            layout: "./layouts/dashLayouts",
            path: "/admin/foods",
            pageTitle: "پنل مدیریت || لیست غذا ها",
            breadCrumb: "لیست غذا ها",
            fullname: req.user.fullname,
            foods,
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

exports.getcreateFood = async (req, res) => {
    try {
        res.render("admin/createFood", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createFood",
            pageTitle: "پنل مدیریت || ایجاد غذا",
            breadCrumb: "ایجاد غذا",
            fullname: req.user.fullname,
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.createFood = async (req, res) => {
    const errors = [];

    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/foods/${fileName}`

    try {
        // GET BODY
        req.body = { ...req.body, image };
        // VALIDATION
        await Food.foodsValidat(req.body);

        // SIZE
        await sharp(image.data).jpeg({ quality: 40 })
            .toFile(uploadPath).catch(err => console.log(err))

        // CREATE MEAL
        await Food.create({
            ...req.body, image: fileName, special: 0
        })

        res.redirect("/admin/foods")

    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("admin/createFood", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createFood",
            pageTitle: "پنل مدیریت || ایجاد غذا",
            breadCrumb: "ایجاد غذا",
            fullname: req.user.fullname,
            errors
        })
    }
}

exports.detailFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        res.render("admin/detailFood", {
            layout: "./layouts/dashLayouts",
            path: "/admin/detailFood",
            pageTitle: "پنل مدیریت || جزئیات غذا",
            breadCrumb: "جزئیات غذا",
            fullname: req.user.fullname,
            food,
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}
exports.deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        unlink(`${appRoot}/public/uploads/images/foods/${food.image}`)
        food.remove();
        res.redirect("/admin/foods")
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.special = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        food.special = true;
        await food.save()
        res.redirect(`/admin/detailfood/${food.id}`)
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.noSpecial = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        food.special = false;
        await food.save()
        res.redirect(`/admin/detailfood/${food.id}`)
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.getEditFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        console.log(food)
        res.render("admin/editFood", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createFood",
            pageTitle: "پنل مدیریت || ویرایش غذا",
            breadCrumb: "ویرایش غذا",
            fullname: req.user.fullname,
            food
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.editFood = async (req, res) => {
    const image = req.files ? req.files.image : {};
    console.log(image);
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/foods/${fileName}`

    const foods = await Food.findById(req.params.id);
    console.log(foods);
    try {

        if (image.name) {
            unlink(`${appRoot}/public/uploads/images/foods/${foods.image}`)
        }

        await sharp(image.data).jpeg({ quality: 40 })
            .toFile(uploadPath).catch(err => console.log(err))

        const { meal, name, price, detail, special } = req.body;
        console.log(req.body);

        foods.meal = meal;
        foods.name = name;
        foods.price = price;
        foods.detail = detail;
        foods.special = special;
        foods.image = image.name ? fileName : foods.image;

        await foods.save();
        return res.redirect("/admin/foods")
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}