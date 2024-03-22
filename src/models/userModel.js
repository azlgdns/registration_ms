const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String
    }
    // Add other user properties here as needed
});

module.exports = mongoose.model('user', userSchema);
