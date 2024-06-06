const Comment = require("../../models/comments");

exports.getAllComments = async (req, res, next) => {
    try{
        const comments = await Comment.find().populate('added_by');
        if(!comments) {
            const err = new Error("Not comments in database");
            return next(err)
        }
        return res.status(200).json({result: true, comments:comments})
    }catch(err){
        console.error(err)
        next(err)
    }
}