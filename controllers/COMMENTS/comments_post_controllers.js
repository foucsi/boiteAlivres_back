const User = require("../../db/models/users");
const BookPlace = require("../../db/models/bookPlaces");
const Comment = require("../../db/models/comments");
const asyncHandler = require("express-async-handler");

//add comments
exports.addComments = asyncHandler( async (req, res, next) => {
    const {uniqueId} = req.params;
    const {bookPlaceId,  comment} = req.body;
    const user = await User.findOne({uniqueId});
    if(!user) {
        const err = new Error("User not found");
        return next(err)
    }
    const bookPlace = await BookPlace.findById({_id: bookPlaceId});
    if(!bookPlace) {
        const err = new Error("BookPlace not found");
        return next(err)}
    const newComment = new Comment({
        added_by: user._id,
        bookPlaceId,
        comment
    })
    await newComment.save();
    return res.status(200).json({result: true, comment: newComment})
})

