const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    text: {
        type: String
    },
    order: [{
        name: String,
        total: Number,
        number: Number
    }],
    trackingCode: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    authority: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 0
    },
    show: {
        type: Boolean,
        default: 1
    },
    send: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })

cardSchema.index({
    trackingCode: 'text'
});

module.exports = mongoose.model("Card", cardSchema)