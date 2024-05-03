import axios from 'axios';
import { JSDOM } from 'jsdom';

const AMAZON_URI = "https://www.amazon.com";

/**
 * Fetches the HTML content of the Amazon search result page for a given search query.
 * @param {string} search - The search query.
 * @returns {Promise<string>} The HTML content of the Amazon search result page.
 * @throws {Error} If there is an error fetching the page or the response status is not 200.
 */
async function getAmazonResultPageHTML(search) {
  try {
    const response = await axios.get(`${AMAZON_URI}/s?k=${search}`, 
    { headers: 
      {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
       Accept: 'text/html',
       setUserAgent: 'true'
      } 
    });

    if (response.status !== 200) throw new Error(`Failed to fetch page: ${response.status}`);
    
    return response.data;

  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Retrieves information about items from Amazon search results.
 * @param {string} search - The search query.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of item objects.
 */
async function getItemsInfo(search) {
  const html = await getAmazonResultPageHTML(search);
  const document = new JSDOM(html).window.document;
  // Extract product information from the search result page container.
  const items = Array.from(document.querySelectorAll(".rush-component .s-latency-cf-section")).map(element => {
    const title = element.querySelector("h2 a span")?.textContent;
    const rating = element.querySelector(".a-icon-star-small span")?.textContent ?? "No rating";
    const reviews = element.querySelector("a .a-size-base")?.textContent ?? "No reviews";
    const url = `${AMAZON_URI}${element.querySelector(".s-title-instructions-style h2 a")?.getAttribute("href")}`;

    return { title, rating, reviews, url };
  });

  return items;
}

export default getItemsInfo;