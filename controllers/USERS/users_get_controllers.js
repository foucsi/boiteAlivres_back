const User = require("../../db/models/users")
const asyncHandler = require("express-async-handler")

//GET ALL USERS

//Utilisation de async-handler pour gérer les erreurs et eviter les bloc try catch

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


//INFO BY USER

exports.infoByUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password -__v").lean();
    if (!user || user.length === 0) {
        const err = new Error("Not users in database");
        return next(err);
    }
    return res.json({ result: true, user: user });
})