const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    uniqueId: { type: String },
    photo: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"},
    premium: { type: Boolean, default: true},
    badge: { type: String, default: "premium", required: function() { return this.premium === true;}},
    share: {
        level: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 1
        },
        badge: {
            type: String,
            enum: ["debutant", "lecteur regulier", "bibliophile", "Maître des livres", "Grand sage de la littérature"],
            default: "debutant"
        },
        totalShared: {
            type: Number,
            default: 0
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchema);
