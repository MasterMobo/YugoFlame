const axios = require("axios");

const getCards = async () => {
    //  Fetch all cards from Ygoprodeck API
    console.log("Fetching card data...");
    const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );
    const cardData = response.data.data.map(
        ({ card_sets, card_prices, ...card }) => ({ ...card })
    );
    return cardData;
};

module.exports = getCards;
