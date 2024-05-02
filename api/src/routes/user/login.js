const router = require("express").Router();

const LoginController = require("../../controllers/user/LoginController");

router.route("/user/login").post(
    (req, res) =>
        LoginController.loginUser(req, res)
);

module.exports = router;