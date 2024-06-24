const errorResponses = {
    'Features not found': { status: 404, result: false, error: 'Features not found' },
    "Not features in database": { status: 404, result: false, error: 'Not features in database' },
};

module.exports = function FeaturesNotFound(err, req, res, next) {
    const errorResponse = errorResponses[err.message];
    if (errorResponse) {
        console.error(err);
        res.status(errorResponse.status).json(errorResponse);
    }else {
        next(err);
    }
}