const express = require("express");
const router = express.Router();

const { getAllLibrary } = require("../controllers/library");

router.route("/").get(getAllLibrary);

module.exports = router;
