const Personal = require('../models/personalMDL');
const Opinion = require('../models/opinionMDL');
const Card = require('../models/cardMDL');
const shortId = require('shortid');
const appRoot = require('app-root-path');
const sharp = require('sharp');
const { unlink } = require('fs/promises');
const ZarinpalCheckout = require('zarinpal-checkout');

const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

// ERROR SERVER
const { get500 } = require('./errorController');

//* HELLPER
const { jalaliMoment } = require('../helper/jalali');
const { sendEmail } = require('../utils/mailer');


exports.homeDashboard = async (req, res) => {
    try {
        const user = req.user;
        res.render("user/index", {
            layout: "./layouts/mainLayouts",
            path: "/home",
            pageTitle: "داشبورد کاربر",
            headerTitle: "داشبورد مدیریتی شما",
            breadCrumb: "داشبورد",
            auth,
            user
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getdetailUser = async (req, res) => {
    try {
        const user = req.user;
        const detailUser = await Personal.findOne({ user: user.id }).populate("user")

        // USER HAVE PERSONAL DETAIL OR NOT
        if (detailUser == null) {
            res.render("user/FormDetailUser", {
                layout: "./layouts/mainLayouts",
                path: "/detailUser",
                pageTitle: "اطلاعات تکمیلی",
                headerTitle: "فرم اطلاعات تکمیلی",
                breadCrumb: " اطلاعات تکمیلی",
                auth,
                user,
                message: req.flash("success_msg")
            })
        } else {
            res.render("user/detailUser", {
                layout: "./layouts/mainLayouts",
                path: "/detailUser",
                pageTitle: "اطلاعات تکمیلی",
                headerTitle: "فرم اطلاعات تکمیلی",
                breadCrumb: " اطلاعات تکمیلی",
                auth,
                user,
                detailUser,
                message: req.flash("success_msg")
            })
        }

    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.detailUser = async (req, res) => {
    const errors = [];
    const image = req.files ? req.files.image : {};
    const fileName = `${shortId.generate()}_${image.name}`;
    const uploadPath = `${appRoot}/public/uploads/images/users/${fileName}`
    const user = req.user;
    try {
        // GET BODY
        req.body = { ...req.body, image };
        // VALIDATION
        await Personal.personalValidate(req.body);

        // SIZE
        await sharp(image.data).jpeg({ quality: 30 })
            .toFile(uploadPath).catch(err => console.log(err))

        // CREATE PERSONAL DETAIL USER
        await Personal.create({
            ...req.body, user: req.user.id, image: fileName
        })
        // !sms send

        // SEND EMAIL
        sendEmail(req.body.email, "تایید اطلاعات شما", "آدرس شما با موفقیت ثبت شد")


        res.redirect('/user/detailuser');
    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("user/FormDetailUser", {
            layout: "./layouts/mainLayouts",
            path: "/detailUser",
            pageTitle: "اطلاعات تکمیلی",
            headerTitle: "فرم اطلاعات تکمیلی",
            breadCrumb: " اطلاعات تکمیلی",
            auth,
            user,
            errors,
            message: req.flash("success_msg")
        })


    }
}

exports.deleteDetailUser = async (req, res) => {
    try {
        // FIND DETAIL
        const detailUser = await Personal.findOneAndRemove({ user: req.user.id })
        await unlink(`${appRoot}/public/uploads/images/users/${detailUser.image}`, (err) => {
            console.log(err);
        })
        res.redirect('/user/home');
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getOpinionUser = async (req, res) => {
    try {
        const user = req.user;

        res.render("user/opinionUser", {
            layout: "./layouts/mainLayouts",
            path: "/user/opinionuser",
            pageTitle: " انتقادات و پیشنهادات",
            headerTitle: "فرم انتقادات و پیشنهادات",
            breadCrumb: " انتقادات و پیشنهادات",
            auth,
            user,
        })

    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.OpinionUser = async (req, res) => {
    const errors = [];
    const user = req.user;
    try {
        const personal = await Personal.findOne({ user: req.user.id })
        if (personal == null) {
            errors.push({
                message: `لطفا ابتدا اطلاعات تکمیلی خود را کامل کنید`
            })
            return res.render("user/opinionUser", {
                layout: "./layouts/mainLayouts",
                path: "/user/opinionuser",
                pageTitle: " انتقادات و پیشنهادات",
                headerTitle: "فرم انتقادات و پیشنهادات",
                breadCrumb: " انتقادات و پیشنهادات",
                auth,
                user,
                errors
            })
        }
        const imageUser = personal.image;
        // GET BODY
        req.body = { ...req.body, image: imageUser };
        // VALIDATE
        await Opinion.opinionValidate(req.body);

        // !sms send

        // SEND EMAIL
        sendEmail(req.body.email, "ارسال نظر برای رستوران رابا", "خیلی خوشحالیم که نظرتان را با ما در میان گذاشتید")

        await Opinion.create({
            ...req.body
        });
        res.redirect("/user/home");
    } catch (err) {
        errors.push({
            message: err.message
        });
        return res.render("user/opinionUser", {
            layout: "./layouts/mainLayouts",
            path: "/user/opinionuser",
            pageTitle: " انتقادات و پیشنهادات",
            headerTitle: "فرم انتقادات و پیشنهادات",
            breadCrumb: " انتقادات و پیشنهادات",
            auth,
            user,
            errors
        })
    }
}

exports.getCardPage = async (req, res) => {
    try {
        const user = req.user;
        res.render("user/card", {
            layout: "./layouts/mainLayouts",
            path: "/user/card",
            pageTitle: "سبد خرید",
            headerTitle: "سفارش های شما",
            breadCrumb: "سبد خرید",
            auth,
            user,
            message: req.flash("error_msg")
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.payment = async (req, res) => {
    try {
        // GET COOKIES
        const itemsCard = req.cookies;
        if (!itemsCard.cartItems) {
            req.flash("error_msg", "لطفا از منو ، سفارش خود را انتخاب کنید")
            return res.redirect("/user/card")
        }

        const items = JSON.parse(itemsCard.cartItems)

        // GET TOTAL PRICE
        const totalPrice = itemsCard.totalPrice;
        // address
        const personal = await Personal.findOne({ user: req.user.id }).populate("user")

        // trackingCode
        trackingCode = shortId.generate();
        // GET BODY
        const { text } = req.body;


        await zarinpal.PaymentRequest({
            Amount: itemsCard.totalPrice, // In Tomans
            CallbackURL: 'http://localhost:3000/user/Verifypayment',
            Description: 'خرید از رستوران رابا',
            Email: personal.user.email,
            Mobile: personal.user.phone
        }).then(response => {
            if (response.status === 100) {
                Card.create({
                    totalPrice, text, order: items, authority: response.authority, user: req.user.id, trackingCode
                })
                res.redirect(response.url);
            }
        }).catch(err => {
            console.error(err);
            get500(req, res);
        });
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.Verifypayment = async (req, res) => {
    try {
        const status = req.query.Status;
        const paymentCode = req.query.Authority;
        const payment = await Card.findOne({ authority: paymentCode }).populate("user")


        if (status == "OK") {
            const response = await zarinpal.PaymentVerification({
                Amount: payment.totalPrice, // In Tomans
                Authority: paymentCode,
            });

            if (response.status === -21) {
                console.log(error);
            } else {
                payment.status = true;
                await payment.save();

                res.clearCookie("cartItems");

                res.render("user/cardDetail", {
                    layout: "./layouts/mainLayouts",
                    path: "/user/cardDetail",
                    pageTitle: "گزارش پرداخت ",
                    headerTitle: "گزارش پرداخت شما",
                    breadCrumb: "سبد خرید",
                    auth,
                    payment,
                    jalaliMoment,
                    message: req.flash("error_msg")
                })

                // !SMS SEND

                // SEND EMAIL
                sendEmail(payment.user.email, " سفارش از رستوران رابا", "مرسی که رستوران رابا را برای سفارش غذا انتخاب کردید.سفارش شما دریافت شد")
            }
        } else {
            res.redirect("/user/card")
        }

    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}


exports.orderPage = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 3;
    try {
        const numberOfPosts = await Card.find().countDocuments();
        const cards = await Card.find({ user: req.user.id }).sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);;
        res.render("user/orderPage", {
            layout: "./layouts/mainLayouts",
            path: "user/orderPage",
            pageTitle: "رزرو",
            headerTitle: "لیست سفارشات شما",
            breadCrumb: "سفارشات من",
            auth,
            cards,
            jalaliMoment,
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

exports.detailOrderPage = async (req, res) => {

    try {

        const cards = await Card.findById(req.params.id).sort({ createdAt: -1 })
        const orders = cards.order;

        res.render("user/detailOrderPage", {
            layout: "./layouts/mainLayouts",
            path: "user/orderPage",
            pageTitle: "رزرو",
            headerTitle: "جزئیات سفارش",
            breadCrumb: "سفارش من",
            auth,
            cards,
            jalaliMoment,
            orders,
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}