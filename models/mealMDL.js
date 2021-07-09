const mongoose = require('mongoose');
const { mealsValidation } = require('../validation/admin');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


mealSchema.statics.mealValidate = function (body) {
    return mealsValidation.validate(body)
}

module.exports = mongoose.model("Meal", mealSchema)