// utils/sendResponse.js

exports.sendResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        ...data
    });
}