const mongoose = require('mongoose');
const { contactValidation } = require('../../validation/siteSetting');



const contactPage = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "عکس الزامی است"],
    },
    image2: {
        type: String,
        required: [true, "عکس دوم الزامی است"],
    },
    text1: {
        type: String,
        required: [true, "متن الزامی است"],
    },
    text2: {
        type: String,
        required: [true, "متن دوم الزامی است"],
    },
    text3: {
        type: String,
        required: [true, "متن سوم الزامی است"],
    },
    phone1: {
        type: String,
        required: [true, "شماره تماس الزامی است"],
    },
    phone2: {
        type: String,
        required: [true, " شماره تماس دوم الزامی است "],
    },
    address1: {
        type: String,
        required: [true, " آدرس اول الزامی است"],
    },
    address2: {
        type: String,
        required: [true, " آدرس دوم الزامی است"],
    },
    email: {
        type: String,
        required: [true, "پست الکترونیک الزامی است"],
    },
    postalCode: {
        type: String,
        required: [true, " کد پستی الزامی است"],
    },
    show: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })


contactPage.statics.contactValidat = function (body) {
    return contactValidation.validate(body)
}


module.exports = mongoose.model("Contact", contactPage)