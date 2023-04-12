const mongoose = require("mongoose");
const TradeSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "complete", "cancelled"],
        default: "pending",
    },
    cardsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Library" }],
}, { timestamps: true});

module.exports = mongoose.model("Trade", TradeSchema);