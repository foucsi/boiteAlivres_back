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
    adress: AddressSchema
})
module.exports = mongoose.model("bookPlaces", BookPlaceSchema);