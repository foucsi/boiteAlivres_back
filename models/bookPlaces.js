const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
        name: { type: String },
        street: { type: String },
        region: { type: String },
        postalCode: { type: String },
    },
    { _id: false }
);

const BookPlaceSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
    photo:{ type: String, default: "https://via.placeholder.com/150"},
    icon: { type: String, default: "book"},
    adress: AddressSchema
})
module.exports = mongoose.model("bookPlaces", BookPlaceSchema);