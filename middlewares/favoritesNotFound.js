module.exports = function favoritesNotFound(err, req, res, next) {
    if (err.message === "Favorite not found") {
        return res.status(200).json({result: false, error: "Favorite not found"})
    }else{
        next(err)
    }
}