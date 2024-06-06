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
    }catch(err){
        console.error(err)
        next(err)
    }
}

//Je trouve l'user connecté
//Je trouve le bookPlace
//Je crée un nouveau commentaire
//Je sauvegarde le commentaire
