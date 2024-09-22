const User = require("../../db/models/users")
const asyncHandler = require("express-async-handler")
const {sendResponse}= require("../../utils/sendReponse")
//GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res, next) => {
        const users = await User.find().select("-password -__v").lean();
        if (!users || users.length === 0) {
            const err = new Error("Not users in database");
            return next(err);
        }
        const usersPremium = users.filter(user => user.premium === true);
        // return res.json({ result: true, users: users, usersPremium: usersPremium });
    return sendResponse(res, 200, { users, usersPremium }, "All users");
});


//INFO BY USER
exports.infoByUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password -__v").lean();
    if (!user || user.length === 0) {
        const err = new Error("Not users in database");
        return next(err);
    }
    // return res.json({ result: true, user: user });
    return sendResponse(res, 200, { user }, "User info");
})