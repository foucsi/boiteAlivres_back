const Favorite = require("../../models/favorites")
const User = require("../../models/users")
const BookPlace = require("../../models/bookPlaces")

exports.getFavoritesByUserId = async (req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
    try {
        const [existingUser, existingBookPlace] = await Promise.all([
            User.findOne({uniqueId}),
            BookPlace.findById(bookPlaceId)
        ])

        if (!existingUser) {
            return res.status(404).json({result: false, message: "User not found"})
        }

        if (!existingBookPlace) {
            return res.status(404).json({result: false, message: "BookPlace not found"})
        }

        const existingFavorite = await Favorite.findOne({
            bookPlace: existingBookPlace._id,
            user: existingUser._id
        })

        if (!existingFavorite) {
            return res.status(404).json({result: false, message: "Favorite not found"})
        }

        return res.status(200).json({result: true, favorite: existingFavorite})

    } catch(err) {
        console.error(err)
        return res.status(500).json({result: false, message: "Internal server error"})
    }
}