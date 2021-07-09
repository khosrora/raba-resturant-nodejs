const mongoose = require('mongoose');
const { blogsValidation } = require('../validation/admin');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "عنوان الزامی است"],
    },
    image: {
        type: String,
        required: [true, "عکس الزامی است"],
    },
    text: {
        type: String,
        required: [true, " ارسال مطلب الزامی است"],
    },
    comment: {
        type: String,
        required: [true, " ارسال نظر ادمین الزامی است"],
    },
    tags: [{
        type: String,
        required: [true, " ارسال تگ الزامی است"],
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    viewCount: {
        type: Number, default: 0
    },
}, { timestamps: true })

blogSchema.statics.blogsValidat = function (body) {
    return blogsValidation.validate(body)
}


module.exports = mongoose.model("Blog", blogSchema)