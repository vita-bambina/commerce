const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    // get authorization header
    const authHeader = req.headers.authorization;

    // extract token
    const token =
        authHeader &&
        authHeader.split(" ")[1];

    // if no token
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {

        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // save user info
        req.user = decoded;

        // continue
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;