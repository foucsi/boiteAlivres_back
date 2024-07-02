const User = require("../../db/models/users")

//GET ALL USERS

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            // middleware usersNotFound below
            const err = new Error("Not users in database");
            return next(err);
        }
        const usersPremium = users.filter(user => user.premium === true);
        return res.json({ result: true, users: users, usersPremium: usersPremium });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};
