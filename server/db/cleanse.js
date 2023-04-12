// CLEAR ALL RECORDS FROM DATABASE. DO NOT RUN IF YOU'RE NOT SURE WHAT YOU'RE DOING
require("dotenv").config({ path: "../.env" });
const Card = require("../models/libraryCard");
const connectDB = require("./connect");

// Cleanse DB
const cleanse = async () => {
    await Card.deleteMany();
};

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await cleanse();
        console.log("Deleted all records from database");
    } catch (error) {
        console.log(error);
    }
})();
