const Favorite = require("../../db/models/favorites")
const User = require("../../db/models/users")
const BookPlace = require("../../db/models/bookPlaces")
const asyncHandler = require("express-async-handler")

const {sendResponse} = require("../../utils/sendReponse")
const {errorResponse} = require("../../utils/errorResponses")

exports.getFavoritesByUserId = asyncHandler( async (req, res, next) => {
    const {uniqueId, bookPlaceId} = req.params
        const [existingUser, existingBookPlace] = await Promise.all([
            User.findOne({uniqueId}),
            BookPlace.findById(bookPlaceId)
        ])
        if (!existingUser) {
            return errorResponse(res, 404, "User not found")
        }
        if (!existingBookPlace) {
            return errorResponse(res, 404, "Book place not found")
        }
        const existingFavorite = await Favorite.findOne({
            bookPlace: existingBookPlace._id,
            user: existingUser._id
        })
        if (!existingFavorite) {
            const err = new Error("Favorite not found")
            return next(err)
        }
        return sendResponse(res, 200, {favorite: existingFavorite}, "Favorite found")
        // return res.status(200).json({result: true, favorite: existingFavorite})
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
        return sendResponse(res, 200, {favorites}, "All favorites")
        // return res.status(200).json({result: true, favorites:favorites})
})