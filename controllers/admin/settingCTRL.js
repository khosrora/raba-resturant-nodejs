const HomePage = require('../../models/setting/homePageMDL');
const ContactPage = require('../../models/setting/contactPageMDL');
const AboutPage = require('../../models/setting/aboutPageMDL');

const { unlink } = require('fs/promises');

const shortId = require('shortid');
const appRoot = require('app-root-path');
const sharp = require('sharp');

// ERROR SERVER
const { get500 } = require('../errorController');



exports.getSliders = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await HomePage.find().countDocuments();
        const sliders = await HomePage.find().sort({ createdAt: -1 })
            .skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("admin/siteSetting/sliders", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || ساخت اسلایدر",
            breadCrumb: "اسلایدر صفحه اول",
            fullname: req.user.fullname,
            index,
            sliders,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.getsliderHomePage = async (req, res) => {
    try {
        res.render("admin/siteSetting/createHomeSlider", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || ساخت اسلایدر",
            breadCrumb: "اسلایدر صفحه اول",
            fullname: req.user.fullname,
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.createSlider = async (req, res) => {
    const errors = [];
    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/settingSite/${fileName}`
    try {
        // GET BODY
        req.body = { ...req.body, image }

        // VALIDATION
        await HomePage.homeValidat(req.body)

        // SIZE
        await sharp(image.data).jpeg()
            .toFile(uploadPath).catch(err => console.log(err))

        await HomePage.create({
            ...req.body, image: fileName
        })
        res.redirect("/admin/setting/homeSliders")
    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("admin/siteSetting/createHomeSlider", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || ساخت اسلایدر",
            breadCrumb: "اسلایدر صفحه اول",
            fullname: req.user.fullname,
            errors
        })
    }
}

exports.detailSlider = async (req, res) => {
    try {
        const slider = await HomePage.findById(req.params.id);
        res.render("admin/siteSetting/detailslider", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || جزئیات اسلایدر",
            breadCrumb: "جزئیات اسلایدر ",
            fullname: req.user.fullname,
            slider
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.deleteSlider = async (req, res) => {
    try {
        const slider = await HomePage.findById(req.params.id);
        unlink(`${appRoot}/public/uploads/images/settingSite/${slider.image}`)
        await slider.remove();
        res.redirect("/admin/setting/homeSliders")
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.showSlider = async (req, res) => {
    try {
        const slider = await HomePage.findById(req.params.id);
        slider.show = true;
        await slider.save();
        res.redirect(`/admin/setting/detailslider/${slider.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.hideSlider = async (req, res) => {
    try {
        const slider = await HomePage.findById(req.params.id);
        slider.show = false;
        await slider.save();
        res.redirect(`/admin/setting/detailslider/${slider.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getcreatecontact = async (req, res) => {
    try {
        res.render("admin/siteSetting/createContact", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || ساخت صفحه ارتباط با ما",
            breadCrumb: "ساخت صفحه ارتباط با ما",
            fullname: req.user.fullname,
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.contactsPage = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await ContactPage.find().countDocuments();
        const contactPages = await ContactPage.find().sort({ createdAt: -1 })
            .skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("admin/siteSetting/contactsPage", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || صفحات ارتباط با ما",
            breadCrumb: "صفحات ارتباط با ما",
            fullname: req.user.fullname,
            index,
            contactPages,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.createcontact = async (req, res) => {
    const errors = [];
    try {
        const image = req.files ? req.files.image : {};
        const fileName = `${shortId.generate()}_${image.name}`;
        const uploadPath = `${appRoot}/public/uploads/images/settingSite/${fileName}`;
        // IMAGE 2
        const image2 = req.files ? req.files.image2 : {};
        const fileName2 = `${shortId.generate()}_${image2.name}`;
        const uploadPath2 = `${appRoot}/public/uploads/images/settingSite/${fileName2}`;
        // GET BODY
        req.body = { ...req.body, image, image2 }
        // VALIDATION
        await ContactPage.contactValidat(req.body)
        // IMAGE 1

        // SIZE image 1 
        await sharp(image.data).jpeg()
            .toFile(uploadPath).catch(err => console.log(err))
        // SIZE image 2 
        await sharp(image2.data).jpeg()
            .toFile(uploadPath2).catch(err => console.log(err))

        await ContactPage.create({
            ...req.body, image: fileName, image2: fileName2
        })
        res.redirect("/admin/setting/contactsPage")
    } catch (err) {
        console.log(err)
        errors.push({
            message: err.message
        })
        return res.render("admin/siteSetting/createContact", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || ساخت صفحه ارتباط با ما",
            breadCrumb: "ساخت صفحه ارتباط با ما",
            fullname: req.user.fullname,
            errors
        })
    }
}

exports.detailcontact = async (req, res) => {
    try {
        const detailContact = await ContactPage.findById(req.params.id);
        res.render("admin/siteSetting/contactPage", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || صفحه درباره ما",
            breadCrumb: "صفحه درباره ما ",
            fullname: req.user.fullname,
            detailContact
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.deletecontact = async (req, res) => {
    try {
        const contact = await ContactPage.findById(req.params.id);
        unlink(`${appRoot}/public/uploads/images/settingSite/${contact.image}`)
        unlink(`${appRoot}/public/uploads/images/settingSite/${contact.image2}`)
        await contact.remove();
        res.redirect("/admin/setting/contactsPage")
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}

exports.showContact = async (req, res) => {
    try {
        const contact = await ContactPage.findById(req.params.id);
        contact.show = true;
        await contact.save();
        res.redirect(`/admin/setting/detailcontact/${contact.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.hideContact = async (req, res) => {
    try {
        const contact = await ContactPage.findById(req.params.id);
        contact.show = false;
        await contact.save();
        res.redirect(`/admin/setting/detailcontact/${contact.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}


exports.aboutsPage = async (req, res) => {
    let index = 1;
    const page = +req.query.page || 1;
    const postPerPage = 5;
    try {
        const numberOfPosts = await AboutPage.find().countDocuments();
        const AboutPages = await AboutPage.find().sort({ createdAt: -1 })
            .skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("admin/siteSetting/aboutsPage", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || صفحات درباره ما",
            breadCrumb: "صفحات درباره ما",
            fullname: req.user.fullname,
            index,
            AboutPages,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPeriviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.getcreateabout = async (req, res) => {
    try {
        res.render("admin/siteSetting/createAbout", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createabouePage",
            pageTitle: "پنل مدیریت || ساخت صفحه درباره ما",
            breadCrumb: "ساخت صفحه درباره ما",
            fullname: req.user.fullname,
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}


exports.createabout = async (req, res) => {
    const errors = [];
    try {
        // IMAGE 1
        const image1 = req.files ? req.files.image1 : {};
        const fileName = `${shortId.generate()}_${image1.name}`;
        const uploadPath = `${appRoot}/public/uploads/images/settingSite/${fileName}`;
        // IMAGE 2
        const image2 = req.files ? req.files.image2 : {};
        const fileName2 = `${shortId.generate()}_${image2.name}`;
        const uploadPath2 = `${appRoot}/public/uploads/images/settingSite/${fileName2}`;
        // IMAGE 3
        const image3 = req.files ? req.files.image3 : {};
        const fileName3 = `${shortId.generate()}_${image3.name}`;
        const uploadPath3 = `${appRoot}/public/uploads/images/settingSite/${fileName3}`;
        // GET BODY
        req.body = { ...req.body, image1, image2, image3 }
        // VALIDATION
        await AboutPage.aboutValidat(req.body)
        // SIZE image 1 
        await sharp(image1.data).jpeg()
            .toFile(uploadPath).catch(err => console.log(err))
        // SIZE image 2 
        await sharp(image2.data).jpeg()
            .toFile(uploadPath2).catch(err => console.log(err))
        // SIZE image 3 
        await sharp(image3.data).jpeg()
            .toFile(uploadPath3).catch(err => console.log(err))

        await AboutPage.create({
            ...req.body, image1: fileName, image2: fileName2, image3: fileName3
        })
        res.redirect("/admin/setting/aboutsPage")
    } catch (err) {
        errors.push({
            message: err.message
        })
        return res.render("admin/siteSetting/createAbout", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createabouePage",
            pageTitle: "پنل مدیریت || ساخت صفحه درباره ما",
            breadCrumb: "ساخت صفحه درباره ما",
            fullname: req.user.fullname,
            errors
        })

    }
}


exports.detailabout = async (req, res) => {
    try {
        const detailabout = await AboutPage.findById(req.params.id);
        res.render("admin/siteSetting/aboutPage", {
            layout: "./layouts/dashLayouts",
            path: "/admin/createHomeSlider",
            pageTitle: "پنل مدیریت || صفحه درباره ما",
            breadCrumb: "صفحه درباره ما ",
            fullname: req.user.fullname,
            detailabout
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.deleteabout = async (req, res) => {
    try {
        const about = await AboutPage.findById(req.params.id);
        unlink(`${appRoot}/public/uploads/images/settingSite/${about.image1}`)
        unlink(`${appRoot}/public/uploads/images/settingSite/${about.image2}`)
        unlink(`${appRoot}/public/uploads/images/settingSite/${about.image3}`)
        await about.remove();
        res.redirect("/admin/setting/aboutsPage")
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}


exports.Showabout = async (req, res) => {
    try {
        const about = await AboutPage.findById(req.params.id);
        about.show = true;
        await about.save();
        res.redirect(`/admin/setting/detailabout/${about.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.hideabout = async (req, res) => {
    try {
        const about = await AboutPage.findById(req.params.id);
        about.show = false;
        await about.save();
        res.redirect(`/admin/setting/detailabout/${about.id}`)
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}