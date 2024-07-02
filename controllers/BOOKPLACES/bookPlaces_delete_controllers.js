const BookPlace = require("../../db/models/bookPlaces");

exports.deleteBookPlace = async(req, res, next) => {
    const {id} = req.params
    try{
        const bookPlace = await BookPlace.findByIdAndDelete({_id:id})
        if(!bookPlace){
            const err = new Error("BookPlace not found")
            return next(err)
        }
        return res.json({result:true, message:"BookPlace deleted"})
    }catch (err){
        console.error(err)
        next(err)
    }
}