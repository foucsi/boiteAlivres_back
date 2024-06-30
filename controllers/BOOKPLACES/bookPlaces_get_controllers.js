const BookPlace = require("../../models/bookPlaces");

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