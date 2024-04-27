const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get("/scrap", async (req, res) => {
    await axios.get('https://www.amazon.com.br/s?k=mouse+azul')
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = router;