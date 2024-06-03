const BookPlace = require("../../models/bookPlaces");

//GET all bookPlaces

exports.getAllBookPlaces = async (req, res, next) => {
    try {
        const bookPlaces = await BookPlace.find()
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