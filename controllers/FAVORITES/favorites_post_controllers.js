const Favorite = require("../../models/favorites")
const BookPlace = require("../../models/bookPlaces")
const User = require("../../models/users")

exports.addFavorite = async(req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
    try{
        const [user, bookPlace] = await Promise.all([
            User.findOne({uniqueId}),
            BookPlace.findById({_id: bookPlaceId})
        ])

        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        if(!bookPlace){
            const err = new Error("BookPlace not found")
            return next(err)
        }
        const existingFavorite = await Favorite.findOne({bookPlace: bookPlace._id, user: user._id})
        if(existingFavorite){
            return res.status(404).json({result: false, message: "Already favorited"})
        }

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