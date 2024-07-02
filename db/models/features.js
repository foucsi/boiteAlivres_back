const mongoose = require('mongoose')

const FeatureSchema = new mongoose.Schema({
    feature: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,
        enum: ['En conception', 'En développement', 'En test', 'Disponible'],
        default: 'En conception'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('features', FeatureSchema)