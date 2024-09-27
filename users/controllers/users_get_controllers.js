const User = require("../../db/models/users")
const asyncHandler = require("express-async-handler")

//utils send response and errorResponse
const {sendResponse}= require("../../utils/sendReponse")
const {errorResponses}= require("../../utils/errorResponses")


//GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res, next) => {
        const users = await User.find().select("-password -__v").lean();
        if (!users || users.length === 0) {
            return errorResponses(res, 404, "Not users in database");
        }
        const usersPremium = users.filter(user => user.premium === true);
        return sendResponse(res, 200, { users, usersPremium }, "All users");
});


//INFO BY USER
exports.infoByUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password -__v").lean();
    if (!user || user.length === 0) {
        return errorResponses(res, 404, "User not found");
    }
    return sendResponse(res, 200, { user }, "User info");
})