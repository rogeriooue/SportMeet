const router = require("express").Router();

const ForgotPassController = require("../../controllers/user/ForgotPassController");

router.route("/user/forgotPass").post(
    (req, res) =>
        ForgotPassController.forgotPass(req, res)
);

module.exports = router;

