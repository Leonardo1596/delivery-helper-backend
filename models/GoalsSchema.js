const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    salaryLimit: {
        type: Number,
        required: true
    },
    goal1Limit: {
        type: Number,
        required: true
    },
    goal2Limit: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('goals', goalsSchema)