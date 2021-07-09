const mongoose = require('mongoose');
const { tagsValidation } = require('../validation/admin');

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "نام و نام خانوادگی الزامی است"],
        maxLength: 20,
        minLength: 2
    }
}, { timestamps: true })


tagSchema.statics.tagValidat = function (body) {
    return tagsValidation.validate(body)
}

module.exports = mongoose.model("Tag", tagSchema);