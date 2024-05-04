const bcrypt = require("bcrypt");
const mailer = require("../../modules/mailer");
const logger = require('../../modules/logger');
const { User } = require("../../models/User");

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;
const HOURS_CODE_VALID = 24;
const MAX_ATTEMPTS = 5;


class NewPassController {
    static async newPass(req, res) {
        try {
            let {
                email,
                recoveryCode,
                newPassword,
                confirmNewPassword
            } = req.body;

            email = email.trim();
            recoveryCode = recoveryCode.trim();

            if (!email || !recoveryCode || !newPassword || !confirmNewPassword) {
                logger.warn("All fields are required", { email: email ? email : "unknown" });
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailRegex.test(email)) {
                logger.warn("Invalid email format", { email: email });
                return res.status(400).json({
                    message: "Invalid email format"
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                logger.warn("User does not exist or Incorrect email", { email: email });
                return res.status(404).json({
                    message: "User does not exist or Incorrect email"
                });
            }

            if (user.attemptCount >= MAX_ATTEMPTS) {
                logger.warn("You have exceeded the maximum number of attempts. Please try again later", { email: email });
                return res.status(400).json({
                    message: "You have exceeded the maximum number of attempts. Please try again later"
                });
            }

            if (user.recoveryCode !== recoveryCode) {
                const updatedAttemptCount = await User.findByIdAndUpdate(user._id, {
                    "$inc": {
                        attemptCount: 1
                    }
                }, { new: true });

                logger.warn(`Invalid recovery code. Attempt ${updatedAttemptCount.attemptCount} of ${MAX_ATTEMPTS}`, { email: email });
                return res.status(400).json({
                    message: `Invalid recovery code. Attempt ${user.attemptCount + 1} of ${MAX_ATTEMPTS}`
                });
            }

            if (user.recoveryCodeGeneratedAt) {
                const timeDifference = Date.now() - new Date(user.recoveryCodeGeneratedAt).getTime();
                const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

                if (timeDifferenceInHours > HOURS_CODE_VALID) {
                    logger.warn("Recovery code has expired. Please request a new one", { email: email });
                    return res.status(400).json({
                        message: "Recovery code has expired. Please request a new one"
                    });
                }
            }

            if (newPassword !== confirmNewPassword) {
                logger.warn("Passwords do not match", { email: email });
                return res.status(400).json({
                    message: "Passwords do not match"
                });
            }

            if (newPassword.length < MIN_PASSWORD_LENGTH) {
                logger.warn(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, { email: email });
                return res.status(400).json({
                    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
                });
            } else if (newPassword.length > MAX_PASSWORD_LENGTH) {
                logger.warn(`Password must not exceed ${MAX_PASSWORD_LENGTH} characters`, { email: email });
                return res.status(400).json({
                    message: `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`
                });
            }


            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);

            const updatedUser = await User.findOneAndUpdate({ email }, {
                "$set": {
                    password: hashedNewPassword
                }
            }, { new: true });

            if (!updatedUser) {
                logger.warn("User does not exist or Incorrect email", { email: email });
                return res.status(400).json({
                    message: "User does not exist or Incorrect email"
                });
            }

            mailer.sendMail({
                to: email,
                from: process.env.EMAIL_FROM,
                subject: "Confirmation of password change - SportMeet",
                html: `
                    <h1>Reset password confirmation</h1>
                    <p>Hello, ${user.name}!</p>
                    <p>Your password has been reset. If this was you, you can safely disregard this email.</p>
                    <p> Changed Password </p>
                    <p>— The SportMeet team</p>
                    <small>This is an automated email. Please do not reply.</small>
                    `,
            }, (error) => {
                if (error) {
                    logger.error("Error sending password updated confirmation email", { email: email });
                    return res.status(500).json({
                        message: "Error sending password updated confirmation email"
                    });
                } else {
                    logger.info("Password updated successfully", { email: email });
                    return res.status(200).json({
                        user: {
                            name: updatedUser.name,
                            email: updatedUser.email
                        },
                        message: "Password updated successfully"
                    });
                }
            });

        } catch (error) {
            logger.error(error.message, { email: email ? email : "unknown" });
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = NewPassController;

