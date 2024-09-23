// utils/sendResponse.js

/**
 * Envoie une réponse JSON standardisée.
 * @param {Object} res - L'objet de réponse Express.
 * @param {number} statusCode - Le code de statut HTTP.
 * @param {Object} [data={}] - Les données à inclure dans la réponse.
 * @param {string} [message=''] - Un message optionnel à inclure dans la réponse.
 */

exports.sendResponse = (res, statusCode, data, message) => {
    if (typeof statusCode !== 'number') {
        throw new Error('statusCode doit être un nombre');
    }

    if (typeof message !== 'string') {
        throw new Error('message doit être une chaîne de caractères');
    }

    if (typeof data !== 'object' || data === null) {
        data = {};
    }
    res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        ...data
    });
}