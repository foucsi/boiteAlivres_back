const Favorite = require("../../models/favorites")

exports.deleteFavorite = async(req, res, next) => {
    const {favoriteId} = req.params
    try{
        const favorite = await Favorite.findByIdAndDelete({_id: favoriteId})
        if(!favorite){
            const err = new Error("Favorite not found")
            return next(err)
        }
        return res.status(200).json({result: true})
    }catch(err){
        console.error(err)
        next(err)
    }
}