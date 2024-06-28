exports.deleteFavorite = async(req, res, next) => {
    const {favoriteId} = req.params
    try{

    }catch(err){
        console.error(err)
        next(err)
    }
}