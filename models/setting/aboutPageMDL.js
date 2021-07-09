const mongoose = require('mongoose');

const { aboutValidation } = require('../../validation/siteSetting');



const aboutPage = new mongoose.Schema({
    image1: {
        type: String,
        required: [true, "عکس  اول الزامی است"],
    },
    title1: {
        type: String,
        required: [true, "عنوان  اول الزامی است"],
    },
    text1: {
        type: String,
        required: [true, "متن  اول الزامی است"],
    },
    image2: {
        type: String,
        required: [true, "عکس  دوم الزامی است"],
    },
    title2: {
        type: String,
        required: [true, "عنوان  دوم الزامی است"],
    },
    text2: {
        type: String,
        required: [true, "متن  دوم الزامی است"],
    },
    image3: {
        type: String,
        required: [true, "عکس  سوم الزامی است"],
    },
    title3: {
        type: String,
        required: [true, "عنوان  سوم الزامی است"],
    },
    text3: {
        type: String,
        required: [true, "متن  سوم الزامی است"],
    },
    show: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })


aboutPage.statics.aboutValidat = function (body) {
    return aboutValidation.validate(body)
}


module.exports = mongoose.model("About", aboutPage)