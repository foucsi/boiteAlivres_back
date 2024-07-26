const BookPlace = require("../../db/models/bookPlaces");
const User = require("../../db/models/users");

//GET all bookPlaces if validation is true

exports.getAllBookPlaces = async (req, res, next) => {
    try {
        const bookPlaces = await BookPlace.find().populate("addedBy")
        // const filteredBookPlaces = bookPlaces.filter(bookPlace => bookPlace.validation === true)
        // const bookPlacesValidationFalse = bookPlaces.filter(bookPlace => bookPlace.validation === false)
        if(!bookPlaces){
            const err = new Error("BookPlaces not found")
            return next(err)
        }
        return res.json({result:true,bookPlaces:bookPlaces})
    } catch (err) {
        console.error(err)
        next(err)
    }
}

//show bookPlace by id

exports.getAllBookPlaceByUserId = async (req, res, next) => {
    const { uniqueId } = req.params
    try{
        const user = await User.findById({uniqueId})
        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        const bookPlaces = await BookPlace.find({addedBy: user._id})
        if(!bookPlaces || bookPlaces.length === 0){
            const err = new Error("BookPlaces not found")
            return next(err)
        }
    }catch(err){
        console.error(err)
        next(err)
    }
}