const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    bookPlace: {type: mongoose.Schema.Types.ObjectId, ref: 'bookPlaces'},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date_added: {type: Date, default: Date.now}
}, { timestamps: true })

module.exports = mongoose.model('favorites', FavoriteSchema)