const User = require('../models/userMDL');
const passport = require('passport');
const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const shortId = require('shortid');

// ERROR SERVER
const { get500 } = require('./errorController');
const { sendEmail } = require('../utils/mailer');


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

        //! sms send
        sendSms(phone, "ثبت نام شما در رستوران رابا با موفقیت صورت گرفت")

        // SEND EMAIL
        sendEmail(email, "خوش آمدید", "از حسن انتخاب شما متشکریم دوست عزیز")

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

        // SEND EMAIL
        sendEmail(email, "خوش آمدید", "خیلی خوش حالیم که دوباره برگشتید")


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



exports.getForgetPassword = async (req, res) => {
    try {
        res.render("forgetPass", {
            layout: "./layouts/mainLayouts",
            path: "/forget-password",
            pageTitle: "بازیابی رمز عبور ",
            headerTitle: " فرم بازیابی رمز عبور",
            breadCrumb: "بازیابی رمز عبور ",
            auth,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            req.flash("error", "کاربری با این پست الکترونیک وجود ندارد");
            return res.render("forgetPass", {
                layout: "./layouts/mainLayouts",
                path: "/forget-password",
                pageTitle: "بازیابی رمز عبور ",
                headerTitle: " فرم بازیابی رمز عبور",
                breadCrumb: "بازیابی رمز عبور ",
                auth,
                message: req.flash("success_msg"),
                error: req.flash("error"),
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: "1h" })

        const resetLink = `http://localhost:3000/auth/reset-password/${token}`;



        // send email
        sendEmail(user.email, "فراموشی رمز عبور", `
        برای تغییر کلمه عبور خود روی لینک زیر کلیک کنید
        <br/>
         <a href="${resetLink}"> لینک تغییر رمز عبور </a>
        ` )

        req.flash("success_msg", "پیام حاوی رمز عبور برای شما ارسال شد");
        res.render("forgetPass", {
            layout: "./layouts/mainLayouts",
            path: "/auth/login",
            pageTitle: "بازیابی رمز عبور ",
            headerTitle: " فرم بازیابی رمز عبور",
            breadCrumb: "بازیابی رمز عبور ",
            auth,
            message: req.flash("success_msg"),
            error: req.flash("error"),
            user
        });
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}



exports.getResetPassword = async (req, res) => {

    const token = req.params.token;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
        if (!decodedToken) {
            return res.redirect("/404");
        }
    }
    res.render("resetPass", {
        layout: "./layouts/mainLayouts",
        path: "/reset-password",
        pageTitle: "بازیابی رمز عبور ",
        headerTitle: " فرم بازیابی رمز عبور",
        breadCrumb: "بازیابی رمز عبور ",
        auth,
        message: req.flash("success_msg"),
        error: req.flash("error"),
        userId: decodedToken.userId
    })
}


exports.ResetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            req.flash("error", "کلمه های عبور یکسان نیست")
            return res.render("resetPass", {
                layout: "./layouts/mainLayouts",
                path: "/reset-password",
                pageTitle: "بازیابی رمز عبور ",
                headerTitle: " فرم بازیابی رمز عبور",
                breadCrumb: "بازیابی رمز عبور ",
                auth,
                message: req.flash("error"),
                userId: req.params.id
            })
        }
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.redirect("/404")
        }

        const hashPass = await bcrypt.hash(password, 10);

        user.password = hashPass;
        await user.save();

        req.flash("success_msg", "کلمه عبور شما با موفقیت تغییر کرد")
        res.redirect("/auth/login")

    } catch (err) {
        console.log(err);
    }
}