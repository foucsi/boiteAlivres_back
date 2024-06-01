const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    added_by:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    bookPlaceId:{type: mongoose.Schema.Types.ObjectId, ref: 'bookPlaces'},
    comment:{type: String, required: true},
    add_by_username: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    photo_by_user: { type: String, required: true },
})
module.exports = mongoose.model('comments', CommentSchema);