const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    added_by:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    bookPlaceId:{type: mongoose.Schema.Types.ObjectId, ref: 'bookPlaces'},
    comment:{type: String, required: true},
}, {timestamps: true})
module.exports = mongoose.model('comments', CommentSchema);