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

exports.getBookPlaceByUserId = async (req, res, next) => {
    const { uniqueId } = req.params
    try{
        const user = await User
    }catch(err){
        console.error(err)
        next(err)
    }
}