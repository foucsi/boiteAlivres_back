const BookPlace = require("../../db/models/bookPlaces");
const asyncHandler = require("express-async-handler");

//Delete bookplaces
exports.deleteBookPlace =asyncHandler( async(req, res, next) => {
    const {id} = req.params
        const bookPlace = await BookPlace.findByIdAndDelete({_id:id})
        if(!bookPlace){
            const err = new Error("BookPlace not found")
            return next(err)
        }
        return res.json({result:true, message:"BookPlace deleted"})
})