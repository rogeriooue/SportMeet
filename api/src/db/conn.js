const mongoose = require("mongoose");
const logger = require("../modules/logger");
const dotenv = require("dotenv");

dotenv.config();


async function main() {
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

        await mongoose.connect(uri);

        logger.info("Connected to MongoDB");

    } catch (error) {
        logger.error("Error connecting to MongoDB");
    }
}

module.exports = main;