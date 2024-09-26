const Feature = require("../../db/models/features")
const asyncHandler = require("express-async-handler");

const {sendResponse} = require("../../utils/sendReponse")

// post a new feature
exports.addFeature = asyncHandler( async (req, res, next) => {
    const {feature, description} = req.body
        const newFeature = new Feature({
            feature,
            description
        })
        await newFeature.save();
        return sendResponse(res, 200, {feature: newFeature}, "Feature added successfully")
        return res.status(200).json({result: true, feature: newFeature})
})