const Comment = require("../../db/models/comments");
const BookPlace = require("../../db/models/bookPlaces");
const asyncHandler = require("express-async-handler");

const {sendResponse} = require("../../utils/sendReponse");
const {errorResponse} = require("../../utils/errorResponses");

//get all comments
exports.getAllComments = asyncHandler( async (req, res, next) => {
        const comments = await Comment.find().populate('added_by');
        if(!comments || comments.length === 0){
            return errorResponse(res, 404, "No comments in database")
        }
        return sendResponse(res,200,{comments}, "All comments")
})

//get all comments by bookPlaceId
exports.getAllCommentsByBookPlace = asyncHandler( async (req, res, next) => {
    const {bookPlaceId} = req.params;
        const bookPlace = await BookPlace.findById({_id: bookPlaceId});
        if(!bookPlace){
            return errorResponse(res, 404, "No bookPlace with this id")
        }
        const comments = await Comment.find({bookPlaceId
                : bookPlaceId}).populate('added_by');
        if(!comments){
            return errorResponse(res, 404, "No comments in database")
        }
        return sendResponse(res,200,{comments}, "All comments by bookPlace")
})