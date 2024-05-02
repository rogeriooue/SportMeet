const router = require("express").Router();

const AccountController = require("../../controllers/user/AccountController");

router.route("/user/account").post(
    (req, res) =>
        AccountController.createAccount(req, res)
);

module.exports = router;
