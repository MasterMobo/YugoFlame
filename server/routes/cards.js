const router = require("express").Router();

const {
    getAllCards,
    createCard,
    getCard,
    updateCard,
    deleteCard,
} = require("../controllers/cards");

router.route("/").get(getAllCards).post(createCard);
router.route("/:cardID").get(getCard).patch(updateCard).delete(deleteCard);

module.exports = router;
