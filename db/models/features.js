const mongoose = require('mongoose')

const FeatureSchema = new mongoose.Schema({
    feature: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,
        enum: ['En conception', 'En développement', 'En test', 'Disponible'],
        default: 'En conception'
    },
}, { timestamps: true })

module.exports = mongoose.model('features', FeatureSchema)