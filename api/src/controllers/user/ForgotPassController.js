const crypto = require("crypto");
const mailer = require("../../modules/mailer");
const logger = require('../../modules/logger');
const { User } = require("../../models/User");

const MINUTES_NEW_CODE = 2;
const HOURS_CODE_VALID = 24;
const MAX_ATTEMPTS = 5;


class ForgotPassController {
    static async forgotPass(req, res) {
        try {
            let { email } = req.body;

            if (!email) {
                logger.warn("Email is required", { email: "unknown" });
                return res.status(400).json({
                    message: "Email is required"
                });
            }

            email = email.trim();
            email = email.toLowerCase();

            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailRegex.test(email)) {
                logger.warn("Invalid email format", { email: email });
                return res.status(400).json({
                    message: "Invalid email format"
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                logger.warn("User does not exist or Incorrect email", { email: email ? email : "unknown" });
                return res.status(404).json({
                    message: "User does not exist or Incorrect email"
                });
            }

            if (user.bannedAt) {
                logger.warn("Banned or Suspended User Account", { email: email });
                return res.status(400).json({
                    message: "Banned or Suspended User Account"
                });
            }

            if (user.recoveryCodeGeneratedAt) {
                const timeDifference = Date.now() - new Date(user.recoveryCodeGeneratedAt.getTime());
                const timeDifferenceInMinutes = timeDifference / (1000 * 60);
                const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

                if (timeDifferenceInMinutes < MINUTES_NEW_CODE) {
                    logger.warn(`Recovery code already sent. Please wait ${MINUTES_NEW_CODE} minutes before requesting a new one`, { email: email });
                    return res.status(400).json({
                        message: `Recovery code already sent. Please wait ${MINUTES_NEW_CODE} minutes before requesting a new one`
                    });
                }

                if (timeDifferenceInHours < HOURS_CODE_VALID && user.attemptCount >= MAX_ATTEMPTS) {
                    logger.warn("You have exceeded the maximum number of attempts. Please try again later", { email: email });
                    return res.status(400).json({
                        message: "You have exceeded the maximum number of attempts. Please try again later"
                    });
                }

                if (timeDifferenceInHours >= HOURS_CODE_VALID) {
                    await User.findByIdAndUpdate(user._id, {
                        "$set": {
                            recoveryCodeGeneratedAt: Date.now(),
                            attemptCount: 0
                        }
                    }, { new: true });
                }
            }


            const timeStamp = Date.now().toString().slice(-3);;
            const randomBytes = crypto.randomBytes(3).toString("hex");

            const recoveryCode = timeStamp + randomBytes;
            const recoveryCodeGeneratedAt = Date.now();

            await User.findByIdAndUpdate(user._id, {
                "$set": {
                    recoveryCode: recoveryCode,
                    recoveryCodeGeneratedAt: recoveryCodeGeneratedAt,
                }
            }, { new: true });


            mailer.sendMail({
                to: email,
                from: process.env.EMAIL_FROM,
                subject: "Forgot Password - SportMeet",
                html:
                    `
                    <h1>Forgot Password</h1>
                    <p>Hello, ${user.name}!</p>
                    <p>We’ve received a request to reset the password for your SportMeet account. No changes have been made to your account yet.</p>
                    <p>You can create a new password using the following code:</p>
                    <p><strong>${recoveryCode}</strong></p>
                    <p>Just a reminder: You have ${HOURS_CODE_VALID} hours to set your new password. After that, you'll need to request a new recovery code.</p>
                    <p>If you didn't request a new password, please ignore this email and ensure your account security.</p>
                    <p>For any questions or concerns, feel free to contact our support team.</p>
                    <p>— The SportMeet Team</p>
                    <small>This is an automated email. Please do not reply.</small>
                    `,
            }, (error) => {
                if (error) {
                    logger.error("Error sending Recovery Code by email", { email: email });
                    return res.status(500).json({
                        message: "Error sending Recovery Code by email"
                    });
                } else {
                    logger.info("Recovery Code sent by email successfully", { email: email });
                    return res.status(200).json({
                        user: {
                            name: user.name,
                            email: user.email
                        },
                        message: "Recovery Code sent by email successfully"
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


module.exports = ForgotPassController;

