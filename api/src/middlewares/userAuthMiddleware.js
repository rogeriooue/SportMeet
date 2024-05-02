const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const logger = require('../modules/logger');


async function userAuthMiddleware(req, res, next) {
    try {

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: "Token is required" });
        }

        const token = authorization.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            logger.warn("User not found", { email: req.user.email },);
            return res.status(401).json({ message: "User not found" });
        }

        if (req.user.bannedAt) {
            logger.warn("User is banned or suspended", { email: req.user.email },);
            return res.status(401).json({ message: "User is banned or suspended" });
        }

        next();

    } catch (error) {
        logger.error(error.message, { email: req.user && req.user.email ? req.user.email : "unknown" });
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = userAuthMiddleware;