const mongoose = require("mongoose");

// df Schema db

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    uniqueId: { type: String }, //token uuid4
    photo: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png"},
    premium: { type: Boolean, default: true},
    badge: { type: String, default: "premium", required: function() { return this.premium === true;}},
    share:{type: String, enum:["debutant", "lecteur regulier", "bibliophile", "Maître des livres", "Grand sage de la littérature"], default: "debutant"},
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchema);
