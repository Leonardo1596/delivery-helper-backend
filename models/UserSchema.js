const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    lastLogin: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});


module.exports = mongoose.model('users', userSchema)