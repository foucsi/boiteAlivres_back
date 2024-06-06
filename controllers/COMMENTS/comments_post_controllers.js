const User = require("../../models/users");
const BookPlace = require("../../models/bookPlaces");
const Comment = require("../../models/comments");

exports.addComments = async (req, res, next) => {
    const {uniqueId} = req.params;
    const {bookPlaceId,  comment} = req.body;
    try{

    }catch(err){
        console.error(err)
        next(err)
    }
}