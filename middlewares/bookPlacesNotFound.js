const errorResponses = {
    "BookPlace not found": { status: 404, result: false, error: "BookPlace not found" },
    "Not bookPlaces in database" : { status: 404, result: false, error: "Not bookPlaces in database" }
}

module.exports = function bookPlacesNotFound(err, req, res, next) {
    const errorResponse = errorResponses[err.message];
    if (errorResponse) {
        console.error(err);
        res.status(errorResponse.status).json(errorResponse);
    } else {
        next(err);
    }
}