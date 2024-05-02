const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require('../../modules/logger');
const { User } = require("../../models/User");

const TOKEN_EXPIRATION = "30d";


class LoginController {
    static async loginUser(req, res) {
        try {
            let {
                email,
                password
            } = req.body;

            if (!email || !password) {
                logger.warn("Email and password are required", { email: email ? email : "unknown" });
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }

            email = email.trim();

            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailRegex.test(email)) {
                logger.warn("Invalid email format", { email: email });
                return res.status(400).json({
                    message: "Invalid email format"
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                logger.warn("User does not exist", { email: email ? email : "unknown" });
                return res.status(404).json({
                    message: "User does not exist"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                logger.warn("Invalid password", { email: email });
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            if (user.bannedAt) {
                logger.warn("Banned or Suspended User Account", { email: email });
                return res.status(403).json({
                    message: "Banned or Suspended User Account"
                });
            }

            const token = jwt.sign(
                { id: user._id }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }
            );

            logger.info("User logged in successfully", { email: email });

            res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email
                },
                token,
                message: "User logged in successfully"
            });

        } catch (error) {
            logger.error(error.message, { email: email ? email : "unknown" });
            res.status(500).json({
                message: error.message
            });
        }
    }

};

module.exports = LoginController;