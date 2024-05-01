const axios = require('axios');
const { JSDOM } = require('jsdom');

const AMAZON_URI = "https://www.amazon.com";

async function getAmazonResultPageHTML(search) {
  try {
    const response = await axios.get(`${AMAZON_URI}/s?k=${search}`, 
    { headers: 
      {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' 
      } 
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    
    return response.data;

  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function getProductsInfo(product) {
  const html = await getAmazonResultPageHTML(product);
  const document = new JSDOM(html).window.document;

  const products = Array.from(document.querySelectorAll(".rush-component .s-latency-cf-section")).map(element => {
    const title = element.querySelector("h2 a span")?.textContent;
    const rating = element.querySelector(".a-icon-star-small span")?.textContent ?? "No rating";
    const reviews = element.querySelector("a .a-size-base")?.textContent ?? "No reviews";
    const url = `${AMAZON_URI}${element.querySelector(".s-title-instructions-style h2 a")?.getAttribute("href")}`;

    return { title, rating, reviews, url };
  });

  return products;
}

module.exports = getProductsInfo;