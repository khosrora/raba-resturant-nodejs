const mongoose = require('mongoose');
const { foodsValidation } = require('../validation/admin');


const foodSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "وارد کردن عکس غذا الزامی است"]
    },
    meal: {
        type: String,
        required: [true, "وارد کردن نوع وعده الزامی است"]
    },
    name: {
        type: String,
        required: [true, "وارد کردن نام غذا الزامی است"]
    },
    price: {
        type: String,
        required: [true, "وارد کردن قیمت غذا الزامی است"]
    },
    detail: {
        type: String,
        required: [true, "وارد کردن جزئیات غذا الزامی است"]
    },
    special: {
        type: Boolean,
        default: 0
    },
}, { timestamps: true })


foodSchema.statics.foodsValidat = function (body) {
    return foodsValidation.validate(body)
}


module.exports = mongoose.model("Food", foodSchema)