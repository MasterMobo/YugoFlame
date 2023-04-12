const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    libRefID: {
        // Library reference ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "Library",
        required: true,
    },
    count: {
        // How many of this card the user has
        type: Number,
        min: 0,
        max: 999,
        default: 1,
    },
    starred: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    frameType: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    atk: {
        type: Number,
    },
    def: {
        type: Number,
    },
    level: {
        type: Number,
    },
    race: {
        type: String,
    },
    attribute: {
        type: String,
    },
    archetype: {
        type: String,
    },
    scale: {
        type: Number,
    },
    linkval: {
        type: Number,
    },
    linkmarkers: {
        type: [String],
        default: undefined,
    },
    card_images: {
        type: [Object],
        default: undefined,
    },
});

CardSchema.methods.incrementCount = function (amount) {
    this.count += amount;
    return this.save();
};

module.exports = mongoose.model("Card", CardSchema);
