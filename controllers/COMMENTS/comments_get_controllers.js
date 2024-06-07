const Comment = require("../../models/comments");
const BookPlace = require("../../models/bookPlaces");

exports.getAllComments = async (req, res, next) => {
    try{
        const comments = await Comment.find().populate('added_by');
        if(!comments || comments.length === 0){
            const err = new Error("Not comments in database");
            return next(err)
        }
        return res.status(200).json({result: true, comments:comments})
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.getAllCommentsByBookPlace = async (req, res, next) => {
    const {bookPlaceId} = req.params;
    try{
        const bookPlace = await BookPlace.findById({_id: bookPlaceId});
        if(!bookPlace){
            const err = new Error("BookPlace not found");
            return next(err)
        }
    }catch(err){
        console.error(err)
        next(err)
    }
}