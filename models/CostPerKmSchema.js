// const mongoose = require('mongoose');

// const CostPerkmSchema = mongoose.Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     oleo: {
//         type: Number,
//         required: true
//     },
//     relacao: {
//         type: Number,
//         required: true
//     },
//     pneuDianteiro: {
//         type: Number,
//         required: true
//     },
//     pneuTraseiro: {
//         type: Number,
//         required: true
//     },
//     gasolina: {
//         type: Number,
//         required: true
//     },
//     updatedAt: {
//         type: Date
//     }
// });

// module.exports = mongoose.model('costPerKm', CostPerkmSchema);

const mongoose = require('mongoose');

const CostPerkmSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    oleo: {
        value: { type: Number, required: true },
        km: { type: Number, required: true }
    },
    relacao: {
        value: { type: Number, required: true },
        km: { type: Number, required: true }
    },
    pneuDianteiro: {
        value: { type: Number, required: true },
        km: { type: Number, required: true }
    },
    pneuTraseiro: {
        value: { type: Number, required: true },
        km: { type: Number, required: true }
    },
    gasolina: {
        value: { type: Number, required: true },
        km: { type: Number, required: true }
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('costPerKm', CostPerkmSchema);