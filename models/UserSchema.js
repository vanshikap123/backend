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
    password: {
        type: String,
        required: true,

        minlength: [3, "length should be greater thazn 3"]
    },
    address: {
        type: String,

    },
    profile: {
        type: String,
        default: 'default.jpg'
    },
    resetToken: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('user', userSchema)