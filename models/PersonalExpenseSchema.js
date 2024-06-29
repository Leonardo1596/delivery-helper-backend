const mongoose = require('mongoose');

const PersonalExpenseSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    weekDay: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    expense: {
        type: Number,
        required: true
    },
    costPerKm: {
        type: Number,
        required: true
    },
    gasolinePrice: {
        type: Number,
        required: true
    },
    gasolineExpense: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('personalexpense', PersonalExpenseSchema);