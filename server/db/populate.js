// REPOPULATE DATABASE. DO NOT RUN IF YOU'RE NOT SURE WHAT YOU'RE DOING
require("dotenv").config({ path: "../.env" });
const Card = require("../models/libraryCard");
const connectDB = require("./connect");
const getCards = require("./getCards");

// Cleanse DB
const cleanse = async () => {
    await Card.deleteMany();
};

// Populate DB
const populate = async (data) => {
    const chunkSize = 100;
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        console.log(`Populating database... [${i}/${data.length}]`);
        await Card.create(chunk);
    }
};

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await cleanse();
        console.log("Deleted all records from database");
        const cardData = await getCards();
        await populate(cardData);
        console.log("Populated database");
    } catch (error) {
        console.log(error);
    }
})();
