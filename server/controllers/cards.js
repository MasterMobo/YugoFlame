const Card = require("../models/cards");
const Library = require("../models/libraryCard");
const { NotFoundError } = require("../errors/index");

const getAllCards = async (req, res) => {
    const { id: userID } = req.user;
    const cards = await Card.find({ owner: userID });
    res.status(200).json(cards);
};

const createCard = async (req, res) => {
    const { id: userID } = req.user;
    const { libRefID, count } = req.body; // Library reference ID

    // Check if the user already has this card
    const existingCard = await Card.findOne({ owner: userID, libRefID });
    if (existingCard) {
        existingCard.incrementCount(count || 1); // Increment the count by the given amount (default 1 if not given)
        return res.status(200).json(existingCard);
    }

    // If the user does not have this card, find the card in the library and create a new card
    const libraryCard = await Library.findById(libRefID);

    const newCard = await Card.create({
        owner: userID,
        libRefID,
        ...libraryCard.giveRef(),
    });
    res.status(201).json(newCard);
};

const getCard = async (req, res) => {
    const { id: userID } = req.user;
    const { cardID } = req.params;

    const foundCard = await Card.findOne({ owner: userID, _id: cardID });
    if (!foundCard) {
        throw new NotFoundError("Card not found");
    }
    res.status(200).json(foundCard);
};

const updateCard = async (req, res) => {
    const { id: userID } = req.user;
    const { cardID } = req.params;

    const foundCard = await Card.findOne({ owner: userID, _id: cardID });
    if (!foundCard) {
        throw new NotFoundError("Card not found");
    }

    const { count, starred } = req.body;

    if (count !== undefined && count === 0) {
        await foundCard.deleteOne();
        return res.status(200).json(foundCard);
    }

    if (count !== undefined) {
        foundCard.count = count;
    }
    if (starred !== undefined) {
        foundCard.starred = starred;
    }

    await foundCard.save();

    res.status(200).json(foundCard);
};

const deleteCard = async (req, res) => {
    const { id: userID } = req.user;
    const { cardID } = req.params;

    const foundCard = await Card.findOneAndDelete({
        owner: userID,
        _id: cardID,
    });
    if (!foundCard) {
        throw new NotFoundError("Card not found");
    }

    res.status(200).json(foundCard);
};

module.exports = { getAllCards, createCard, getCard, updateCard, deleteCard };
