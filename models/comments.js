const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    added_by:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    bookPlaceId:{type: mongoose.Schema.Types.ObjectId, ref: 'bookPlaces'},
    comment:{type: String, required: true},
    created_at: { type: Date, default: Date.now },
})
module.exports = mongoose.model('comments', CommentSchema);