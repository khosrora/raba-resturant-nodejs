const mongoose = require('mongoose');
const { userValidation } = require('../validation/auth');


const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, " کلمه عبور الزامی است"],
    },
    isAdmin: {
        type: Boolean,
        default: 0
    },
    show: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })




userSchema.statics.userValidat = function (body) {
    return userValidation.validate(body)
}



module.exports = mongoose.model("User", userSchema);