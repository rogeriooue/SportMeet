const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const hbs = require("nodemailer-express-handlebars");
// const path = require("path");

dotenv.config();


const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transport.use("compile", hbs({
    viewEngine: "handlebars",
    extName: ".html",
    // viewPath: path.resolve("./src/resources/mail/"),
}));



module.exports = transport;