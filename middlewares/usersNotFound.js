const errorResponses = {
    'User not found': { status: 404, result: false, error: 'User not found' },
    "Mot de passe invalide ou email erroné": { status: 404, result: false, error: 'Mot de passe invalide ou email erroné' },
};

module.exports = function messageNotFound(err, req, res, next) {
    const errorResponse = errorResponses[err.message];
    if (errorResponse) {
        console.error(err);
        res.status(errorResponse.status).json(errorResponse);
    }else {
        next(err);
    }
}
