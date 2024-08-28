const BookPlaces = require("../../db/models/bookPlaces");
const asyncHandler = require("express-async-handler");


// change status validation false to true
exports.updateBookPlace = asyncHandler( async (req, res, next) => {
    const {bookPlaceId}=req.params;
        const bookPlace = await BookPlaces.findByIdAndUpdate(bookPlaceId, {validation: true}, {new: true});
            if(!bookPlace) {
                const error = new Error("BookPlace not found");
                return next(error);
            }
        res.status(200).json({result:true, message: "BookPlace updated successfully", bookPlace: bookPlace});
})

//update description of bookPlace

exports.updateDescription = async (req, res, next) => {
    const {bookPlaceId}=req.params;
    const {description}=req.body;
    try{
        const bookPlace = await BookPlaces.findByIdAndUpdate(bookPlaceId, {description: description}, {new: true});
        if(!bookPlace) {
            const error = new Error("BookPlace not found");
            return next(error);
        }
        return res.status(200).json({result:true, message: "BookPlace updated successfully", bookPlace: bookPlace});
    }catch(err){
        console.error(err);
        next(err)
    }
}