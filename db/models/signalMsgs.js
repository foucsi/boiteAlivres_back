const mongoose = require('mongoose')

const signalMsgSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    bookPlace: { type: mongoose.Schema.Types.ObjectId, ref: 'bookPlaces' },
    message: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
})

module.exports = mongoose.model('signalMsgs', signalMsgSchema)