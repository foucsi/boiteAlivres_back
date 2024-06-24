const Feature = require("../../models/features")

exports.getAllFeatures = async (req, res, next) => {
    try{
        const features = await Feature.find()
        if(!features || features.length === 0){
            const error = new Error("Not features in database")
            return next(error)
        }
    }catch(err){
        console.error(err)
        next(err)
    }
}