const Favorite = require("../../models/favorites")

exports.deleteFavorite = async(req, res, next) => {
    const {favoriteId} = req.params
    try{
        const favorite = await Favorite.findById({_id: favoriteId})
    }catch(err){
        console.error(err)
        next(err)
    }
}