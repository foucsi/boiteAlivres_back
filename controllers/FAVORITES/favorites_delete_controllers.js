const Favorite = require("../../db/models/favorites")
const asyncHandler = require("express-async-handler")

exports.deleteFavorite = asyncHandler( async(req, res, next) => {
    const {favoriteId} = req.params
        const favorite = await Favorite.findByIdAndDelete({_id: favoriteId})
        if(!favorite){
            const err = new Error("Favorite not found")
            return next(err)
        }
        return res.status(200).json({result: true})
})