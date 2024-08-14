module.exports = function msgOrEmailMissing(err, req, res, next) {
    if (err.message === "Message or email is missing") {
        return res.status(404).json({result: false, error: "Message or email is missing"})
    }else{
        next(err)
    }
}