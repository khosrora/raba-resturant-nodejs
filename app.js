const path = require('path');
require('dotenv').config({
    path: "./config/.env"
})
const express = require('express');
const fileUpload = require('express-fileupload');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser')
// const Kavenegar = require('kavenegar');

// *PASSPORT
require('./config/passport');

const app = express();

// Cookie parser
app.use(cookieParser())

// *MONGODB
const connectDB = require('./config/db');
connectDB();

//* BODY_PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* FLASH 
app.use(flash());

// * FILEUPLOAD
app.use(fileUpload());

// *SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
// *Passport
app.use(passport.initialize());
app.use(passport.session());


//* VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "./layouts/mainLayouts.ejs")
app.use(expressLayouts)

//*PUBLIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// * ROUTES
app.use("/", require('./routes/publicRoutes'));
app.use("/auth", require('./routes/authRoutes'));
app.use("/user", require('./routes/userRoutes'));
app.use("/admin", require('./routes/adminRoutes'));
app.use("/admin/setting", require('./routes/settingRoutes'));


// *404PAGE
app.use("*", require('./routes/errorRoutes.js'))









//! SERVER RUN
PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is Running on port ${PORT}`);
})