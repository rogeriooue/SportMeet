const bcrypt = require("bcrypt");
const mailer = require("../../modules/mailer");
const logger = require('../../modules/logger');
const { User } = require("../../models/User");

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;


class AccountController {
    static async createAccount(req, res) {
        try {
            let {
                name,
                surname,
                email,
                password,
                confirmPassword
            } = req.body;

            name = name.trim();
            surname = surname.trim();
            email = email.trim();

            if (!name || !surname || !email || !password || !confirmPassword) {
                logger.warn("All fields are required", { email: email ? email : "unknown" });
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            if (password !== confirmPassword) {
                logger.warn("Passwords do not match", { email: email });
                return res.status(400).json({
                    message: "Passwords do not match"
                });
            }

            if (password.length < MIN_PASSWORD_LENGTH) {
                logger.warn(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, { email: email });
                return res.status(400).json({
                    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
                });
            } else if (password.length > MAX_PASSWORD_LENGTH) {
                logger.warn(`Password must not exceed ${MAX_PASSWORD_LENGTH} characters`, { email: email });
                return res.status(400).json({
                    message: `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`
                });
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                logger.warn("User already exists", { email: email });
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createUserAccount = await User.create({
                name,
                surname,
                email,
                password: hashedPassword,
            });

            mailer.sendMail({
                to: email,
                from: process.env.EMAIL_FROM,
                subject: "Created Account - SportMeet",
                html:
                    `
                    <h1>Created Account</h1>
                    <p>Welcome, ${name}!</p>
                    <p>Your account is ready for use.</p>
                    <p>You just joined our community. We're very excited to have you here.</p>
                    <p>— The SportMeet team</p>
                    <small>This is an automatic e-mail. Do not reply to this e-mail.</small>
                    `,
            }, (error) => {
                if (error) {
                    logger.error("Error sending email to created account", { email: email });
                    return res.status(500).json({
                        message: "Error sending email to created account"
                    });
                } else {
                    logger.info("User Account created successfully", { email: email });
                    return res.status(201).json({
                        user: {
                            name: createUserAccount.name,
                            surname: createUserAccount.surname,
                            email: createUserAccount.email
                        },
                        message: "User Account created successfully"
                    });
                }
            });

        } catch (error) {
            logger.error(error.message, { email: email ? email : "unknown" });
            res.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = AccountController;