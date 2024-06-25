const Favorite = require("../../models/favorites")
const BookPlace = require("../../models/bookPlaces")
const User = require("../../models/users")

exports.addFavorite = async(req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
    try{
        const user = await User.findOne({uniqueId})
        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        const bookPlace = await BookPlace.findById({_id: bookPlaceId})
        if(!bookPlace){
            const err = new Error("BookPlace not found")
            return next(err)
        }
        // const alreadyFavorite = await Favorite.findOne({bookPlace: bookPlace._id, user: user._id})
        // if(alreadyFavorite){
        //     return res.status(404).json({result: false, message: "Already favorited"})
        // }

        const newFavorite = new Favorite({
            bookPlace: bookPlace._id,
            user: user._id
        })
        await newFavorite.save()
        return res.status(200).json({result: true, favorite: newFavorite})
    }catch(err){
        console.error(err)
        next(err)
    }
}