const mongoose = require('mongoose');
const { personalValidation } = require('../validation/user');

const personalSchema = new mongoose.Schema({
    image: {
        type: String , 
        required: [true, "  عکس الزامی است"],
    },
    address: {
        type: String,
        required: [true, "  آدرس الزامی است"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })

personalSchema.statics.personalValidate = function (body) {
    return personalValidation.validate(body)
}




module.exports = mongoose.model("Personal", personalSchema);