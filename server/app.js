require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const app = express();

// Security packages
const helmet = require("helmet");
const cors = require("cors");

// Middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const jwtAuth = require("./middlewares/auth");

// Routers
const authRouter = require("./routes/auth");
const libraryRouter = require("./routes/library");
const cardRouter = require("./routes/cards");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/cards", jwtAuth, cardRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
    await connectDB(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
};

start();
