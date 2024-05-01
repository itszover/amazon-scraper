const express = require("express");
const scrapController = require("./scrapController")
const router = express.Router();

router.get("/", scrapController);

module.exports = router;