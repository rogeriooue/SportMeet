const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: true,
    },
    bannedAt: {
        type: Date,
        default: null,
    },
    recoveryCode: {
        type: String,
        default: null,
    },
    recoveryCodeGeneratedAt: {
        type: Date,
        default: null,
    },
    attemptCount: {
        type: Number,
        default: 0,
    },
},
    { collection: "users", timestamps: true }
);


const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    UserSchema,
};