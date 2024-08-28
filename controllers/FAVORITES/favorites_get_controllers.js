const Favorite = require("../../db/models/favorites")
const User = require("../../db/models/users")
const BookPlace = require("../../db/models/bookPlaces")
const asyncHandler = require("express-async-handler")
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

exports.getFavoritesByUserId = asyncHandler( async (req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
        const [existingUser, existingBookPlace] = await Promise.all([
            User.findOne({uniqueId}),
            BookPlace.findById(bookPlaceId)
        ])
        if (!existingUser) {
            const err = new Error("User not found")
            return next(err)
        }
        if (!existingBookPlace) {
            const err = new Error("BookPlace not found")
            return next(err)
        }
        const existingFavorite = await Favorite.findOne({
            bookPlace: existingBookPlace._id,
            user: existingUser._id
        })
        if (!existingFavorite) {
            const err = new Error("Favorite not found")
            return next(err)
        }
        return res.status(200).json({result: true, favorite: existingFavorite})
})

exports.getFavorites = asyncHandler( async (req, res, next) => {
    const {uniqueId} = req.params
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
})