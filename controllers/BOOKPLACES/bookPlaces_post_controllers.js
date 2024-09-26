const User = require("../../db/models/users");
const BookPlace = require("../../db/models/bookPlaces");

const asyncHandler = require("express-async-handler");

const {sendResponse} = require("../../utils/sendReponse");

// Add a new bookPlaces
exports.addBookPlace =asyncHandler( async (req, res, next) => {
    const {uniqueId}= req.params
    // const {name,street,region,postalCode} = address
    const {latitude,longitude,description,adress} = req.body
        const user = await User.findOne({uniqueId})
        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        const newBookPlace = new BookPlace({
            addedBy: user._id,
            latitude,
            longitude,
            description,
            adress
        })
        const savedBookPlace = await newBookPlace.save()
        return sendResponse(res,201,{bookPlace:savedBookPlace},"BookPlace added successfully")
        // return res.json({result:true,bookPlace:savedBookPlace})
})
