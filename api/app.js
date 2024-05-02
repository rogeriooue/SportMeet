const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./src/modules/logger");

dotenv.config();

app.use(cors());

app.use(express.json());

// DB Connection
const conn = require("./src/db/conn");

conn();

// Routes
const routes = require("./src/routes/router");
// const userAuthMiddleware = require("./src/middlewares/userAuthMiddleware");

app.use("/api", routes);

app.listen(process.env.PORT, function () {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`);
});


// Exemplo de como usar o middleware de autenticação
// app.get(
//     "/api/test",
//     userAuthMiddleware,
//     (req, res) => {
//         res.json(req.user);
//     }
// );
