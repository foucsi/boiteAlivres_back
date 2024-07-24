const Favorite = require("../../db/models/favorites")
const User = require("../../db/models/users")
const BookPlace = require("../../db/models/bookPlaces")
//
// exports.getFavoritesByUserId = async (req, res, next) => {
//     const {uniqueId, bookPlaceId} = req.params
//     try {
//         const [existingUser, existingBookPlace] = await Promise.all([
//             User.findOne({uniqueId}),
//             BookPlace.findById(bookPlaceId)
//         ])
//         if (!existingUser) {
//             return res.status(404).json({result: false, message: "User not found"})
//         }
//         if (!existingBookPlace) {
//             return res.status(404).json({result: false, message: "BookPlace not found"})
//         }
//         const existingFavorite = await Favorite.findOne({
//             bookPlace: existingBookPlace._id,
//             user: existingUser._id
//         })
//         if (!existingFavorite) {
//             return res.status(404).json({result: false, message: "Favorite not found"})
//         }
//         return res.status(200).json({result: true, favorite: existingFavorite})
//     } catch(err) {
//         console.error(err)
//         next(err)
//     }
// }

exports.getFavoritesByUserId = async (req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
    try {
        const [existingUser, existingBookPlace] = await Promise.all([
            User.findOne({uniqueId}),
            BookPlace.findById(bookPlaceId)
        ])
        if (!existingUser) {
            const err = new Error("User not found")
            return next(err)
        }
        if (!existingBookPlace) {
            return res.status(404).json({result: false, message: "BookPlace not found"})
        }
        const existingFavorite = await Favorite.findOne({
            bookPlace: existingBookPlace._id,
            user: existingUser._id
        })
        if (!existingFavorite) {
            return res.status(200).json({result: false, message: "Favorite not found"})
        }
        return res.status(200).json({result: true, favorite: existingFavorite})
    } catch(err) {
        console.error(err)
        res.status(500).json({result: false, message: "Server error", error: err.message})
    }
}

exports.getFavorites = async (req, res, next) => {
    const {uniqueId} = req.params
    try{
        const existingUser = await User.findOne({uniqueId})
        if(!existingUser){
            const err = new Error("User not found")
            return next(err)
        }
        const favorites = await Favorite.find({user: existingUser._id}).populate('bookPlace')
        if(!favorites){
            const err = new Error("Not favorites in database")
            return next(err)
        }
        return res.status(200).json({result: true, favorites:favorites})
    }catch(err){
        console.error(err)
        next(err)
    }
}