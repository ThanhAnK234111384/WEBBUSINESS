function loadProducts() {
    const xhr = new XMLHttpRequest();
    // Use CORS proxy for fetching XML
    const proxyURL = 'https://api.allorigins.win/raw?url=';
    const xmlURL = 'https://tranduythanh.com/datasets/CA02_products.xml';

    xhr.open('GET', proxyURL + encodeURIComponent(xmlURL), true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                displayProducts(xmlDoc);
            } catch (e) {
                document.getElementById('productsTable').innerHTML =
                    '<div class="error">Error parsing XML data</div>';
            }
        } else {
            document.getElementById('productsTable').innerHTML =
                '<div class="error">Error loading products (Status: ' + xhr.status + ')</div>';
        }
    };

    xhr.onerror = function() {
        document.getElementById('productsTable').innerHTML =
            '<div class="error">Network error occurred</div>';
    };

    xhr.send();
}

function displayProducts(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');

    if (products.length === 0) {
        document.getElementById('productsTable').innerHTML =
            '<div class="error">No products found</div>';
        return;
    }

    let html = '<div class="products-grid">';

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const id = product.getElementsByTagName('id')[0]?.textContent || 'N/A';
        const name = product.getElementsByTagName('name')[0]?.textContent || 'Untitled Product';
        const detail = product.getElementsByTagName('detail')[0]?.textContent || 'No description available';
        const image = product.getElementsByTagName('image')[0]?.textContent || 'https://via.placeholder.com/280x220?text=No+Image';

        html += '<div class="product-card">';
        html += `<img src="${image}" alt="${name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x220?text=No+Image'">`;
        html += '<div class="product-content">';
        html += `<div class="product-id">ID: ${id}</div>`;
        html += `<div class="product-name">${name}</div>`;
        html += `<div class="product-detail">${detail}</div>`;
        html += '</div>';
        html += '</div>';
    }

    html += '</div>';
    document.getElementById('productsTable').innerHTML = html;
}

// Load products when page loads
window.onload = function() {
    loadProducts();
};
