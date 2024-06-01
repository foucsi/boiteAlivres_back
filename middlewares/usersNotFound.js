module.exports = function usersNotFound(err, req, res, next) {
    if (err.message === 'User not found') {
        console.error(err);
        res.status(404).json({result: false, message: "User not found"});
    } else {
        next(err);
    }
}