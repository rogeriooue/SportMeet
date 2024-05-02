const router = require("express").Router();

const loginRouter = require("./user/login");

const accountRouter = require("./user/account");

const forgotPassRouter = require("./user/forgotPass");

const newPassRouter = require("./user/newPass");

router.use("/", accountRouter);

router.use("/", loginRouter);

router.use("/", forgotPassRouter);

router.use("/", newPassRouter);

module.exports = router;