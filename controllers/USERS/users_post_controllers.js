const User = require("../../models/users")

const { checkBody } = require("../../modules/checkBody");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid").v4;

//login User
exports.loginUser = async (req, res, next) => {
    if (!checkBody(req.body, ["email", "password"])) {
        return res.status(400).json({ result: false, error: "Missing fields" });
    }
    try {
        const data = await User.findOne({ email: req.body.email });
        if (data && (await bcrypt.compare(req.body.password, data.password))) {
            // Generate a JWT token for the user
            const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return res.json({ result: true, user: data, token });
        } else {
            const err = new Error("User not found");
            return next(err);
        }
    } catch (err) {
        console.error(err)
        next(err)
    }
};

// register User
exports.registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!checkBody(req.body, ["username", "password", "email"])) {
        return res.status(400).json({ result: false, error: "Missing fields" });
    }
    try {
        //user existing by email ?
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
            //creation d'un jeton token avec jwt
            token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // console.log("Generated token:", token);
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
