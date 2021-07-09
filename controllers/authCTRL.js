const User = require('../models/userMDL');
const passport = require('passport');
const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');

const shortId = require('shortid');

// ERROR SERVER
const { get500 } = require('./errorController');


exports.loginPage = async (req, res) => {
    try {
        res.render("login", {
            layout: "./layouts/mainLayouts",
            path: "/auth/login",
            pageTitle: "ورود ",
            headerTitle: " فرم ورود",
            breadCrumb: "ورود ",
            auth,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.registerPage = async (req, res) => {
    try {
        res.render("register", {
            layout: "./layouts/mainLayouts",
            path: "/auth/register",
            pageTitle: "ثبت نام ",
            headerTitle: "فرم ثبت نام",
            breadCrumb: "ثبت نام ",
            auth,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}


exports.registerUser = async (req, res) => {
    const errors = [];
    try {

        // VALIDATION
        await User.userValidat(req.body);

        // req.body
        const { fullname, email, phone, password } = req.body;
        // check User 
        const oldUser = await User.findOne({ email })
        const oldUserContact = await User.findOne({ phone })
        if (oldUser || oldUserContact) {
            errors.push({
                message: "کاربری با این مشخصات وجود دارد"
            })
            return res.render("register", {
                layout: "./layouts/mainLayouts",
                path: "/auth/register",
                pageTitle: "ثبت نام ",
                headerTitle: " برای ثبت نام در سایت از فرم زیر اقدام کنید",
                breadCrumb: "ثبت نام ",
                auth,
                errors,
                message: req.flash("success_msg")
            })
        }
        // hash
        const hashPass = await bcrypt.hash(password, 10)

        // createUser
        await User.create({
            fullname, email, phone, password: hashPass
        })

        // redirect
        req.flash("success_msg", "ثبت نام با موفقیت به اتمام رسید")
        res.redirect("/auth/login")

    } catch (err) {
        errors.push({
            message: err.message
        })

        return res.render("register", {
            layout: "./layouts/mainLayouts",
            path: "/auth/register",
            pageTitle: "ثبت نام ",
            headerTitle: " برای ثبت نام در سایت از فرم زیر اقدام کنید",
            breadCrumb: "ثبت نام ",
            errors,
            auth,
            message: req.flash("success_msg")
        })

    }
}

exports.loginUser = async (req, res, next) => {
    const errors = [];
    try {
        // get CAPTCHA
        if (!req.body["g-recaptcha-response"]) {
            req.flash("success_msg", "اعتبار سنجی کپچا الزامی است")
            return res.redirect("/auth/login");
        }
        const secretKey = process.env.SECRET_KEY;
        const verifyUrl = `
        https://google.com/recaptcha/api/siteverify?secret=${secretKey}
        &response=${req.body["g-recaptcha-response"]}&
        remoteip=${req.connection.remoteAddress}
        `
        const response = await fetch(verifyUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        })
        const json = await response.json();

        const { email, password } = req.body;
        if (!email || !password) {
            req.flash("error", "لطفا تمام مقادیر خواسته شده را وارد کنید")
            return res.render("login", {
                layout: "./layouts/mainLayouts",
                path: "/auth/login",
                pageTitle: "ورود ",
                headerTitle: " فرم ورود",
                breadCrumb: "ورود ",
                auth,
                message: req.flash("success_msg"),
                error: req.flash("error"),
            })
        }
        // SET SESSION
        if (req.body.remember) {
            req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 * 30;
        } else {
            req.session.cookie.expire = null;
        }

        // RECAPTCHA IS TRUE ?
        if (json.success) {
            passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/auth/login",
                failureFlash: true
            })(req, res, next);
        }

    } catch (err) {
        req.flash("error", "ایرادی در سرور بوجود آمده است")
        res.redirect("/auth/login")
    }
}

exports.logoutUser = async (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
}



// exports.getForgetPassword = async (req, res) => {
//     try {
//         res.render("forgetPass", {
//             layout: "./layouts/mainLayouts",
//             path: "/forget-password",
//             pageTitle: "بازیابی رمز عبور ",
//             headerTitle: " فرم بازیابی رمز عبور",
//             breadCrumb: "بازیابی رمز عبور ",
//             auth,
//             message: req.flash("success_msg"),
//             error: req.flash("error"),
//         })
//     } catch (err) {
//         console.log(err);
//         get500(req, res);
//     }
// }

// exports.forgetPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await User.findOne({ email })

//         if (!user) {
//             req.flash("error", "کاربری با این پست الکترونیک وجود ندارد");
//             return res.render("forgetPass", {
//                 layout: "./layouts/mainLayouts",
//                 path: "/forget-password",
//                 pageTitle: "بازیابی رمز عبور ",
//                 headerTitle: " فرم بازیابی رمز عبور",
//                 breadCrumb: "بازیابی رمز عبور ",
//                 auth,
//                 message: req.flash("success_msg"),
//                 error: req.flash("error"),
//             });
//         }

//         const token = shortId.generate();
//         console.log(token);

//         // !send sms

//         req.flash("success_msg", "پیام حاوی رمز عبور برای شما ارسال شد");
//         res.render("codePass", {
//             layout: "./layouts/mainLayouts",
//             path: "/auth/login",
//             pageTitle: "بازیابی رمز عبور ",
//             headerTitle: " فرم بازیابی رمز عبور",
//             breadCrumb: "بازیابی رمز عبور ",
//             auth,
//             message: req.flash("success_msg"),
//             error: req.flash("error"),
//             user
//         });


//     } catch (err) {
//         console.log(err);
//         get500(req, res);
//     }
// }