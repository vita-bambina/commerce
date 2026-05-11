const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
                next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role === "admin") {
        next(); // allow access
    } else {
        return res.status(403).json({
            message: "Admins only"
        });
    }
};

module.exports = {adminMiddleware, authMiddleware};