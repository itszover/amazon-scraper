import getItemsInfo from "./scraper.js";

/**
 * Controller function to handle requests and send response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
async function fetchItemscontroller(req, res) {
    try {
      const keyword = req.query.keyword;
  
      if (!keyword) return res.status(400).json({ error: "Missing keyword" }); 

      const itemsInfo = await getItemsInfo(keyword);
      res.status(200).json(itemsInfo);
  
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

export default fetchItemscontroller;