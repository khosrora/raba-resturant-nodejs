const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "نام و نام خانوادگی الزامی است"],
        maxLength: 255,
        minLength: 5
    },
    email: {
        type: String,
        required: [true, " پست الکترونیک الزامی است"],
    },
    phone: {
        type: String,
        required: [true, "شماره تماس الزامی است"],
    },
    phone2: {
        type: String,
        required: [true, "شماره تماس دوم الزامی است"],
    },
    time: {
        type: String,
        required: [true, "  زمان رزرو الزامی است"],
    },
    number: {
        type: String,
        required: [true, "  تعداد الزامی است"],
    },
    Confirmation: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })





module.exports = mongoose.model("reservation", reservationSchema);