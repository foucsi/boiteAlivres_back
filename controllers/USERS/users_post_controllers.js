const User = require("../../db/models/users")

const { checkBody } = require("../../modules/checkBody");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid").v4;

const asyncHandler = require("express-async-handler");

//login User
exports.loginUser = asyncHandler( async (req, res, next) => {
    if (!checkBody(req.body, ["email", "password"])) {
        return res.status(400).json({ result: false, error: "Missing fields" });
    }
        const data = await User.findOne({ email: req.body.email });
        if (data && (await bcrypt.compare(req.body.password, data.password))) {
            // Generate a JWT token for the user
            const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return res.json({ result: true, user: data, token });
        } else {
            const error = new Error("Mot de passe invalide ou email erroné");
            next(error);
            // return res.status(400).json({ result: false, error: "Mot de passe invalide ou email erroné" });
        }
})

// register User
exports.registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!checkBody(req.body, ["username", "password", "email"])) {
        return res.status(400).json({ result: false, error: "Missing fields" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser || password.length < 6) {
            return res.status(400).json({
                result: false,
                error: existingUser ? "User already exist" : "Password to short",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        //creation du user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            uniqueId: uuidv4(),
        });
        const savedUser = await newUser.save();
        let token;
        try {
            token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                result: false,
                error: "JWT Error",
            });
        }
        return res.json({ result: true, user: savedUser, token });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
