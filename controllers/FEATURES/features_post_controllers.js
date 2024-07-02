const Feature = require("../../db/models/features")

exports.addFeature = async (req, res, next) => {
    const {feature, description} = req.body
    try{
        const newFeature = new Feature({
            feature,
            description
        })
        await newFeature.save();
        return res.status(200).json({result: true, feature: newFeature})
    }catch(err){
        console.error(err)
        next(err)
    }
}