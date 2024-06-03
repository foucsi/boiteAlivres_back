const BookPlaces = require("../../models/bookPlaces");


// change status validation false to true
exports.updateBookPlace = async (req, res, next) => {
    const {bookPlaceId}=req.params;
        try{
        const bookPlace = await BookPlaces.findByIdAndUpdate(bookPlaceId, {validation: true}, {new: true});
            if(!bookPlace) {
                const error = new Error("BookPlace not found");
                return next(error);
            }
        res.status(200).json({result:true, message: "BookPlace updated successfully"});
        }catch(err){
            console.error(err);
            next(err)
    }
}