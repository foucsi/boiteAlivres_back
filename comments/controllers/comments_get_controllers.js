const Comment = require("../../db/models/comments");
const BookPlace = require("../../db/models/bookPlaces");
const asyncHandler = require("express-async-handler");

const {sendResponse} = require("../../utils/sendReponse");

//get all comments
exports.getAllComments = asyncHandler( async (req, res, next) => {
        const comments = await Comment.find().populate('added_by');
        if(!comments || comments.length === 0){
            const err = new Error("Not comments in database");
            return next(err)
        }
        return sendResponse(res,200,{comments}, "All comments")
        // return res.status(200).json({result: true, comments:comments})
})

//get all comments by bookPlaceId
exports.getAllCommentsByBookPlace = asyncHandler( async (req, res, next) => {
    const {bookPlaceId} = req.params;
        const bookPlace = await BookPlace.findById({_id: bookPlaceId});
        if(!bookPlace){
            const err = new Error("BookPlace not found");
            return next(err)
        }
        const comments = await Comment.find({bookPlaceId
                : bookPlaceId}).populate('added_by');
        if(!comments){
            const err = new Error("Not comments in database");
            return next(err)
        }
        return sendResponse(res,200,{comments}, "All comments by bookPlace")
        // return res.status(200).json({result: true, comments:comments})
})