module.exports = function msgOrEmailMissing(err, req, res, next) {
    if (err.message === "Message is missing") {
        return res.status(200).json({result: false, error: "Message vide !"})
    }else{
        next(err)
    }
}