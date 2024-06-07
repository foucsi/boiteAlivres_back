const errorResponses = {
    "Comment not found": { status: 404, result: false, error: "Comment not found" },
    "Not comments in database" : { status: 404, result: false, error: "Not comments in database" }
}

module.exports = function commentsNotFound(err, req, res, next) {
    const errorResponse = errorResponses[err.message];
    if (errorResponse) {
        console.error(err);
        res.status(errorResponse.status).json(errorResponse);
    } else {
        next(err);
    }
}