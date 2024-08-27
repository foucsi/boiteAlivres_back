const BookPlace = require("../../db/models/bookPlaces");
const User = require("../../db/models/users");

const asyncHandler = require("express-async-handler");

//GET all bookPlaces if validation is true

exports.getAllBookPlaces = asyncHandler( async (req, res, next) => {
        const bookPlaces = await BookPlace.find().populate("addedBy").select("-adress").lean()
        // const filteredBookPlaces = bookPlaces.filter(bookPlace => bookPlace.validation === true)
        // const bookPlacesValidationFalse = bookPlaces.filter(bookPlace => bookPlace.validation === false)
        if(!bookPlaces){
            const err = new Error("BookPlaces not found")
            return next(err)
        }
        return res.json({result:true,bookPlaces:bookPlaces})
})

//show bookPlace by id
exports.getAllBookPlaceByUserId = asyncHandler(async (req, res, next) => {
    const { uniqueId } = req.params
    const user = await User.findOne({uniqueId})
        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        const bookPlaces = await BookPlace.find({addedBy: user._id})
        if(!bookPlaces || bookPlaces.length === 0){
            const err = new Error("Not bookPlaces in database")
            return next(err)
        }
        return res.json({result:true,bookPlaces:bookPlaces})
})