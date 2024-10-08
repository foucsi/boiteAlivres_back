const User = require("../../db/models/users")
const asyncHandler = require("express-async-handler")

//utils send response and errorResponse
const {sendResponse}= require("../../utils/sendReponse")
const {errorResponses}= require("../../utils/errorResponses")

/**
 * Get all users with optional filtering and pagination
 * @route GET /api/users
 * @access Public
 * @returns {Array} users - All users
 * @returns {Array} usersPremium - All premium users
 */


//GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res, next) => {
        const {page=1,limit=10} = req.query;
        const skip = (page - 1) * limit;
        const query = premium ? { premium: premium === 'true' } : {};

        const users = await User.find().select("-password -__v").skip(skip).limit(Number(limit)).lean();
        if (users.length === 0) {
            return errorResponses(res, 404, "Not users in database");
        }
        const usersPremium = users.filter(user => user.premium === true);
        return sendResponse(res, 200, { users, usersPremium }, "All users");
});


//INFO BY USER
exports.infoByUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {page=1,limit=10} = req.query;
    const skip = (page - 1) * limit;

    const user = await User.findById(id).select("-password -__v").skip(skip).limit(Number(limit)).lean();
    if (user.length === 0) {
        return errorResponses(res, 404, "User not found");
    }
    return sendResponse(res, 200, { user }, "User info");
})