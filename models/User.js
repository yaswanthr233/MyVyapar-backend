const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        length: 10,
    },
    password:{
        type: String,
        required: true,
        constraints: {
            minlength: 6,
            maxlength: 20,
        }
    },
    avatarUrl:{
        type: String,
        default: null,
    },
    status:{
        type: String,
        default: "active",
    },
    businessName:{
        type: String,
        default: null,
    },
    businessType:{
        type: String,
        default: null,
    },
    address:{
        type: String,
        default: null,
    },
    lastLogin:{
        type: Date,
        default: null,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"],
    }
})

module.exports = mongoose.model('User', userSchema);