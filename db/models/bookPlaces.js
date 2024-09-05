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
    photo:{ type: String, default: "https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg"},
    icon: { type: String, default: "bookshelf"},
    adress: AddressSchema,
    validation: { type: Boolean, default: false },
    status:{type:"string", default: "pending"},
}, { timestamps: true });
module.exports = mongoose.model("bookPlaces", BookPlaceSchema);