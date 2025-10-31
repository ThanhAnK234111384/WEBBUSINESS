function loadRSS() {
    const rssContent = document.getElementById('rssContent');

    // VnExpress Sport RSS feed URL
    const rssURL = 'https://webapi.dantri.com.vn/lottery/get-vietlott-jack';

    // Using a CORS proxy to fetch RSS feed
    const proxyURL = 'https://api.allorigins.win/get?url=';

    fetch(proxyURL + encodeURIComponent(rssURL))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            displayRSS(xmlDoc);
        })
        .catch(error => {
            console.error('Error fetching RSS:', error);
            rssContent.innerHTML = '<div class="error">Error loading RSS feed</div>';
        });
}

function displayRSS(xmlDoc) {
    const items = xmlDoc.getElementsByTagName('item');
    const rssContent = document.getElementById('rssContent');

    if (items.length === 0) {
        rssContent.innerHTML = '<div class="error">No RSS items found</div>';
        return;
    }

    let html = '<div class="rss-grid">';

    // Display first 12 items
    const maxItems = Math.min(items.length, 12);

    for (let i = 0; i < maxItems; i++) {
        const item = items[i];

        const title = item.getElementsByTagName('title')[0]?.textContent || 'No title';
        const link = item.getElementsByTagName('link')[0]?.textContent || '#';
        const description = item.getElementsByTagName('description')[0]?.textContent || 'No description';
        const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';

        // Extract image from description (VnExpress includes images in CDATA)
        let imageUrl = extractImageFromDescription(description);

        // Clean description text
        const cleanDescription = stripHTML(description);

        html += '<div class="rss-item">';
        if (imageUrl) {
            html += `<img src="${imageUrl}" alt="${title}" class="rss-image" onerror="this.style.display='none'">`;
        }
        html += '<div class="rss-content">';
        html += `<div class="rss-title"><a href="${link}" target="_blank">${title}</a></div>`;
        html += `<div class="rss-description">${cleanDescription}</div>`;
        html += `<div class="rss-date">${formatDate(pubDate)}</div>`;
        html += '</div>';
        html += '</div>';
    }

    html += '</div>';
    rssContent.innerHTML = html;
}

function extractImageFromDescription(html) {
    if (!html) return null;

    // Try to extract image URL from HTML
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
    }

    return null;
}

function stripHTML(html) {
    if (!html) return '';

    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';

    // Remove extra whitespace
    return text.trim().replace(/\s+/g, ' ');
}

function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Load RSS when page loads
window.onload = function() {
    loadRSS();
};
