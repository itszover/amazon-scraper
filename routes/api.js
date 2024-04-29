const express = require("express");
const router = express.Router();
const axios = require('axios');
const { JSDOM } = require('jsdom');

async function getAmazonData() {
  try {
    const response = await axios.get('https://www.amazon.com/s?k=keyboard', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' } });
    
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

router.get("/scrap", async (req, res) => {
  const data = await getAmazonData();
  const dom = new JSDOM(data);
  const document = dom.window.document;
  
  const products = Array.from(document.querySelectorAll(".s-result-item")).map(element => {
    const title = element.querySelector(".s-title-instructions-style h2 a span")?.textContent;
    const rating = element.querySelector(".a-icon-star-small a")?.textContent;
    const reviews = element.querySelector("a .a-size-base")?.textContent;
    const url = element.querySelector("h2 a")?.href;

    return { title, rating, reviews, url };
  });
  
  res.send(products);
});

module.exports = router;