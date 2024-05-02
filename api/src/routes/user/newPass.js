const router = require("express").Router();

const NewPassController = require("../../controllers/user/NewPassController");

router.route("/user/newPass").post(
    (req, res) =>
        NewPassController.newPass(req, res)
);

module.exports = router;