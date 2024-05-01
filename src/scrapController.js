const getProductsInfo = require("./scraper");

async function controller(req, res) {
    try {
      const keyword = req.query.keyword;
  
      if (!keyword) {
        res.status(400).json({ error: "Missing keyword"})
      } else {
        res.send(await getProductsInfo(keyword));
      }
  
    } catch (error) {
      if (res.statusCode !== 200) {
        res.json({ error: `Error ${res.statusCode}: ${error.message}` });
      }
    }
}

module.exports = controller;