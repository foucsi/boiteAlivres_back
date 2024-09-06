const Feature = require("../../db/models/features")
const asyncHandler = require("express-async-handler");

//get all features
exports.getAllFeatures = asyncHandler( async (req, res, next) => {
        const features = await Feature.find()
        if(!features || features.length === 0){
            const error = new Error("Not features in database")
            return next(error)
        }
        res.status(200).json({result: true, features: features})
})