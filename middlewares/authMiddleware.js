const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res
            .status(401)
            .json({ result: false, error: "Authentication failed" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ result: false, error: "Authentication failed" });
    }
};

module.exports = authMiddleware;
