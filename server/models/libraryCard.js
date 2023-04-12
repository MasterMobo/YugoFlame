const mongoose = require("mongoose");
const LibraryCardSchema = new mongoose.Schema({
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

LibraryCardSchema.methods.giveRef = function () {
    // Returns everything except the _id and __v properites (for references)
    const { _id, __v, ...rest } = this._doc;
    return rest;
};

module.exports = mongoose.model("LibraryCard", LibraryCardSchema);
