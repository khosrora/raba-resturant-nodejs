const mongoose = require('mongoose');
const { homeValidation } = require('../../validation/siteSetting');


const homeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "عکس الزامی است"],
    },
    title: {
        type: String,
        required: [true, "عنوان"],
    },
    text: {
        type: String,
        required: [true, "متن الزامی است"],
    },
    show: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })


homeSchema.statics.homeValidat = function (body){
    return homeValidation.validate(body)
}

module.exports = mongoose.model("Home", homeSchema)