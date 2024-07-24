module.exports = function favoritesNotFound(err, req, res, next) {
    if (err.message === "Favorite not found") {
        return res.status(404).json({result: false, message: "Favorite not found"})
    }else{
        next(err)
    }
}