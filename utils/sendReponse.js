// utils/sendResponse.js

exports.sendResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        message: message,
        data: data
    });
}