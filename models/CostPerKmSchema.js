const mongoose = require('mongoose');

const CostPerKmSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    oleo: {
        type: Number,
        required: true
    },
    relacao: {
        type: Number,
        required: true
    },
    pneuDianteiro: {
        type: Number,
        required: true
    },
    pneuTraseiro: {
        type: Number,
        required: true
    },
    gasolina: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('costPerkm', CostPerKmSchema);