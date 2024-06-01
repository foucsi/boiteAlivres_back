const mongoose = require("mongoose");

// df Schema db

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    // add created_at
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    uniqueId: { type: String }, //token uuid4
    photo: String,
});

module.exports = mongoose.model("users", UserSchema);
