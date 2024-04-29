async function getProductsSearchResult(product) {
    try {
        const response = await fetch(`http://localhost:8000/api/scrap?keyword=${product}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();

        return products;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error.message);
    }
}

async function displayProducts(product) {
    const products = await getProductsSearchResult(product);
    document.querySelector('.products-container').innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <p>Rating: ${product.rating}</p>
            <p>Reviews: ${product.reviews}</p>
            <a href="${product.url}">Go to product</a>
        `;
        document.querySelector('.products-container').appendChild(productElement);
    });
}

const input = document.querySelector('input');

document.querySelector('button').addEventListener('click', () => displayProducts(input.value));