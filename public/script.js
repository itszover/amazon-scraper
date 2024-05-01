const input = document.querySelector('input');

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    displayProducts(input.value.trim());
});

async function getProductsSearchResult(product) {
    try {
        const response = await fetch(`http://localhost:8000/api/scrap?keyword=${product}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();

        return products;
    } catch (error) {
        displayError(error.message);
        console.error('There has been a problem with your fetch operation:', error.message);
    }
}

async function displayProducts(product) {
    const productsContainer = document.querySelector('.products-container')
    productsContainer.textContent = "";
    
    try {
        if (product === "") {
            throw new Error("Please enter a product");
        }

        const products = await getProductsSearchResult(product);
        const fragment = document.createDocumentFragment();
    
        products.forEach(product => {
            const productElement = createProductElement(product);
            fragment.appendChild(productElement);
        });
    
        productsContainer.appendChild(fragment);
    } catch (error) {
        displayError(error.message);
        console.error('Failed to display products: ', error.message);
    }
}

function createProductElement(product) {
    const productElement = document.createElement("div");
    const html = `<h2>${product.title}</h2>
        <p>Rating: ${product.rating}</p>
        <p>Reviews: ${product.reviews}</p>
        <a href="${product.url}">Go to product</a>`;

    productElement.classList.add("product");
    productElement.innerHTML = html;

    return productElement;
}

function displayError(message) {
    const errorSpan = document.querySelector('span');
    errorSpan.textContent = message;
}