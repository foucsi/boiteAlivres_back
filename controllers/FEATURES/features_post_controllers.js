const Feature = require("../../db/models/features")
const asyncHandler = require("express-async-handler");

exports.addFeature = asyncHandler( async (req, res, next) => {
    const {feature, description} = req.body
        const newFeature = new Feature({
            feature,
            description
        })
        await newFeature.save();
        return res.status(200).json({result: true, feature: newFeature})
})