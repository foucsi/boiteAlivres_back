const User = require("../../models/users");
const Comment = require("../../models/comments");

// delete comment

exports.deleteComment = async (req, res, next) => {
    const {uniqueId} = req.params;
    const {commentId} = req.body;
    try{
        const user = await User.findOne({uniqueId});
        if(!user) {
            const err = new Error("User not found");
            return next(err)
        }
        const comment = await Comment.findById({_id: commentId});
        if(!comment) {
            const err = new Error("Comment not found");
            return next(err)
        }
        if(comment.added_by.toString() !== user._id.toString()) {
            const err = new Error("You are not allowed to delete this comment");
            return next(err)
        }
        await Comment.findByIdAndDelete({_id: commentId});
        return res.status(200).json({result: true, message: "Comment deleted successfully"})
    }catch(err){
        console.error(err)
        next(err)
    }
}