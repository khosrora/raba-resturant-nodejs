const mongoose = require('mongoose');
const { opinionValidation } = require('../validation/user');

const opinionSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "عکس الزامی است"],
    },
    fullname: {
        type: String,
        required: [true, " پست الکترونیک الزامی است"],
    },
    phone: {
        type: String,
        required: [true, "  شماره تماس الزامی است"],
    },
    opinion: {
        type: String,
        required: [true, " ارسال نظر  الزامی است"],
    },
    show: {
        type: Boolean,
        default: 0
    },
}, { timestamps: true })

opinionSchema.statics.opinionValidate = function (body) {
    return opinionValidation.validate(body)
}


module.exports = mongoose.model("Opinion", opinionSchema);