const User = require('../models/userMDL');
const Reserv = require('../models/reservationMDL');
const Blog = require('../models/blogMDL');
const Opinion = require('../models/opinionMDL');
const Food = require('../models/foodMDL');
const Card = require('../models/cardMDL');

// Site SETTING
const HomePage = require('../models/setting/homePageMDL');
const ContactPage = require('../models/setting/contactPageMDL');
const AboutPage = require('../models/setting/aboutPageMDL');

// ERROR SERVER
const { get500 } = require('./errorController');

//* HELLPER
const { jalaliMoment } = require('../helper/jalali');
const { truncate } = require('../helper/truncate');

exports.index = async (req, res) => {
    try {
        // OPINIONS
        const opinions = await Opinion.find({ show: true });
        // FOODS
        const breakfasts = await Food.find({ meal: "صبحانه" }).sort({ createdAt: -1 }).limit(3);
        const lunchs = await Food.find({ meal: "ناهار" }).sort({ createdAt: -1 }).limit(3);
        const dinners = await Food.find({ meal: "شام" }).sort({ createdAt: -1 }).limit(3);
        const drinks = await Food.find({ meal: "نوشیدنی" }).sort({ createdAt: -1 }).limit(3);
        const Appetizers = await Food.find({ meal: "پیش غذا ها" }).sort({ createdAt: -1 }).limit(3);
        const afterMeals = await Food.find({ meal: "بعد از غذا" }).sort({ createdAt: -1 }).limit(3);
        // SPECIAL FOOD
        const specials = await Food.find({ special: true }).sort({ createdAt: -1 }).limit(3);

        // SITE SETTING
        const sliders = await HomePage.find({ show: true }).sort({ createdAt: -1 })

        //  LENGTH
        const foodLength = await Food.find().countDocuments();
        const userLength = await User.find().countDocuments();
        const cardLength = await Card.find().countDocuments();

        res.render("index", {
            layout: "./layouts/mainLayouts",
            path: "/home",
            pageTitle: "صفحه اصلی",
            auth,
            message: req.flash("success_msg"),
            opinions,
            lunchs,
            breakfasts,
            dinners,
            drinks,
            Appetizers,
            afterMeals,
            specials,
            sliders,
            userLength,
            foodLength,
            cardLength
        })
    } catch (err) {
        console.log(err);
    }
}

exports.menuPage = async (req, res) => {
    try {
        const breakfasts = await Food.find({ meal: "صبحانه" }).sort({ createdAt: -1 });
        const lunchs = await Food.find({ meal: "ناهار" }).sort({ createdAt: -1 });
        const dinners = await Food.find({ meal: "شام" }).sort({ createdAt: -1 });
        const drinks = await Food.find({ meal: "نوشیدنی" }).sort({ createdAt: -1 });
        const Appetizers = await Food.find({ meal: "پیش غذا ها" }).sort({ createdAt: -1 });
        const afterMeals = await Food.find({ meal: "بعد از غذا" }).sort({ createdAt: -1 });

        res.render("menu", {
            layout: "./layouts/mainLayouts",
            path: "/menu",
            pageTitle: "منو رستوران",
            headerTitle: "ویژه های رستوران ما",
            breadCrumb: "منو رستوران",
            auth,
            lunchs,
            breakfasts,
            dinners,
            drinks,
            Appetizers,
            afterMeals
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}


exports.contactPage = async (req, res) => {

    try {
        const contact = await ContactPage.findOne({ show: true }).sort({ createdAt: -1 }).limit(1)
        res.render("contact", {
            layout: "./layouts/mainLayouts",
            path: "/contact",
            pageTitle: "راه ارتباط با ما",
            headerTitle: "راه های ارتباط با ما",
            breadCrumb: "تماس با ما",
            contact,
            auth
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.aboutPage = async (req, res) => {
    try {
        const about = await AboutPage.findOne({ show: true }).sort({ createdAt: -1 }).limit(1)
        res.render("about", {
            layout: "./layouts/mainLayouts",
            path: "/about",
            pageTitle: "درباره ما",
            headerTitle: "! درباره ما بیشتر بدانید",
            breadCrumb: "درباره ما",
            auth,
            about
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getreservationPage = async (req, res) => {
    try {
        res.render("reservation", {
            layout: "./layouts/mainLayouts",
            path: "/reservation",
            pageTitle: "رزرو",
            headerTitle: "دوست من از اینجا رزرو کن",
            breadCrumb: "فرم رزرو",
            auth,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.reservationPage = async (req, res) => {
    try {
        // GET BODY
        req.body = { ...req.body };
        await Reserv.create({
            ...req.body
        });

        //! SEND SMS


        req.flash("success_msg", `عزیز درخواست شما ثبت شد ${req.body.fullname} `)
        res.redirect("/reservation");
    } catch (err) {
        console.log(err);
    }
}

exports.blogsPage = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 6;
    try {
        const numberOfPosts = await Blog.find().countDocuments();
        const blogs = await Blog.find().populate("user").sort({ createdAt: -1 }).skip((page - 1) * postPerPage).limit(postPerPage);
        res.render("blogs", {
            pageTitle: "بلاگ ها",
            headerTitle: "!!! هر چیزی در مورد غذا",
            breadCrumb: " بلاگ ها ",
            layout: "./layouts/mainLayouts",
            path: "/blogs",
            pageTitle: "صفحه اصلی",
            auth,
            jalaliMoment,
            truncate,
            blogs,
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
exports.blogsingle = async (req, res) => {
    try {
        const suggests = await Blog.find().populate("user").sort({ createdAt: -1 }).limit(8);
        const blog = await Blog.findById(req.params.id).populate("user")
        await blog.viewCount++
        await blog.save()
        res.render("blogSingle", {
            pageTitle: "بلاگ ها",
            headerTitle: blog.title,
            breadCrumb: " بلاگ ها ",
            layout: "./layouts/mainLayouts",
            path: "/blogs",
            pageTitle: "صفحه اصلی",
            auth,
            jalaliMoment,
            truncate,
            blog,
            suggests
        })
    } catch (err) {
        console.log(err)
        get500(req, res);
    }
}







