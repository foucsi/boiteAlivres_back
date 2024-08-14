module.exports = function msgOrEmailMissing(err, req, res, next) {
    if (err.message === "Message is missing") {
        return res.status(200).json({result: false, error: "Message is missing"})
    }else{
        next(err)
    }
}