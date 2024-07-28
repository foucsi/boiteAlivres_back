const User = require("../../db/models/users")
const asyncHandler = require("express-async-handler")

//GET ALL USERS

exports.getAllUsers = asyncHandler(async (req, res, next) => {
        //on exclut les champs sensible password et inutile
        const users = await User.find().select("-password -__v").lean();
        if (!users || users.length === 0) {
            // middleware usersNotFound below
            const err = new Error("Not users in database");
            return next(err);
        }
        const usersPremium = users.filter(user => user.premium === true);
        return res.json({ result: true, users: users, usersPremium: usersPremium });
});
