const User = require("../../models/users");
const BookPlace = require("../../models/bookPlaces");
const Comment = require("../../models/comments");

exports.addComments = async (req, res, next) => {
    const {uniqueId} = req.params;
    const {bookPlaceId,  comment} = req.body;
    try{
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
        bookPlaceId: bookPlace._id,
        comment
    })
    await newComment.save();
    return res.status(200).json({result: true, comment: newComment})
    }catch(err){
        console.error(err)
        next(err)
    }
}

