exports.errorResponses = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message: message || 'An error occurred'
    });
}