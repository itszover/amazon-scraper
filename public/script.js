const form = document.querySelector('#search-form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    const input = document.querySelector('#search-input');
    event.preventDefault();
    displayItems(input.value.trim());
}

/**
 * Displays an error message on the webpage.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
    const errorSpan = document.querySelector('.error-message');
    errorSpan.textContent = message;
}

/**
 * Fetches search results from the server based on the provided search keyword.
 * @param {string} search - The search keyword.
 * @returns {Promise<Array>} - A promise that resolves to an array of search result items.
 */
async function getSearchResult(search) {
    try {
        const apiURL = `http://localhost:8000/api/scrap?keyword=${encodeURIComponent(search)}`;
        const response = await fetch(apiURL);
        
        if (!response.ok) throw new Error(`Failed to fetch search results`);

        return response.json();

    } catch (error) {
        displayError(error.message);
        console.error(`There has been a problem with your fetch operation: ${error.message}`);
    }
}

/**
 * Creates an item element based on the provided item object.
 * @param {Object} item - The item object containing title, rating, reviews, and url properties.
 * @returns {HTMLElement} - The created item element.
 */
function createItemElement(item) {
    const itemElement = document.createElement("div");
    const html = `<p>${item.title}</p>
        <p>Rating: ${item.rating}</p>
        <p>Reviews: ${item.reviews}</p>
        <a href="${item.url}" target="_blank">Go to item</a>`;

    itemElement.classList.add("item");
    itemElement.innerHTML = html;

    return itemElement;
}

/**
 * Displays items based on the provided search item.
 * @param {string} item - The search item.
 * @returns {Promise<void>} - A promise that resolves when the items are displayed.
 */
async function displayItems(item) {
    const itemsContainer = document.querySelector('.items-container')
    itemsContainer.textContent = "";
    
    try {
        // Check if the search item is empty.
        if (!item?.length) throw new Error("Please enter something to search for.");

        const items = await getSearchResult(item);
        const fragment = document.createDocumentFragment();
    
        items.forEach(item => {
            const itemElement = createItemElement(item);
            fragment.appendChild(itemElement);
        });
    
        itemsContainer.appendChild(fragment);
    } catch (error) {
        displayError('coco bosta' + error.message);
        console.error(error.message);
    }
}