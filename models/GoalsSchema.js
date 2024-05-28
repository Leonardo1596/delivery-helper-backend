const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    salario: {
        segunda: {
            type: Number,
            required: true
        },
        domingo: {
            type: Number,
            required: true
        }
    },
    meta_1: {
        type: Number,
        required: true
    },
    meta_2: {
        type: Number,
        required: true
    },
    restante: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('goals', goalsSchema)