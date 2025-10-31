function loadJackpot() {
    const selectedValue = document.querySelector('input[name="lottery"]:checked').value;
    const dataDiv = document.getElementById('jackpotData');

    dataDiv.innerHTML = '<div class="loading">Loading...</div>';

    // Using fetch to get Vietlott Jackpot information
    fetch('https://webapi.dantri.com.vn/lottery/get-vietlott-jack')
        .then(response => response.json())
        .then(response => {
            if (response.status && response.data) {
                displayData(response.data, selectedValue);
            } else {
                dataDiv.innerHTML = '<div class="loading">No data available</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            dataDiv.innerHTML = '<div class="loading">Error loading data</div>';
        });
}

function displayData(data, type) {
    const dataDiv = document.getElementById('jackpotData');

    if (!data || !data[type] || data[type].length === 0) {
        dataDiv.innerHTML = '<div class="loading">No data available</div>';
        return;
    }

    const lotteryData = data[type][0]; // Get first item from array
    const isMega = type === 'mega645';
    const title = isMega ? 'Mega 6/45' : 'Power 6/55';

    // Parse numbers
    const numbers = lotteryData.ListNumber.split('|')[0].split('-');
    const specialNumber = isMega ? null : lotteryData.ListNumber.split('|')[1];

    let html = '<div class="lottery-card">';

    // Header
    html += '<div class="lottery-header">';
    html += `<div class="lottery-title">${title}</div>`;
    html += `<div class="draw-info">Draw #${lotteryData.DrawId} - ${lotteryData.DrawDate}</div>`;
    html += '</div>';

    // Jackpot 1
    html += '<div class="jackpot-section">';
    html += '<div class="jackpot-label">Jackpot 1</div>';
    html += `<div class="jackpot-amount">${formatCurrency(lotteryData.Jackpot)}</div>`;
    html += `<div class="jackpot-winners">Winners: ${lotteryData.JackportWinner || 0}</div>`;
    html += '</div>';

    // Jackpot 2 for Power 6/55
    if (!isMega && lotteryData.Jackpot2) {
        html += '<div class="jackpot-section" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">';
        html += '<div class="jackpot-label">Jackpot 2</div>';
        html += `<div class="jackpot-amount">${formatCurrency(lotteryData.Jackpot2)}</div>`;
        html += `<div class="jackpot-winners">Winners: ${lotteryData.JackportWinner2 || 0}</div>`;
        html += '</div>';
    }

    // Winning Numbers
    html += '<div class="numbers-section">';
    html += '<div class="numbers-label">Winning Numbers</div>';
    html += '<div class="lottery-numbers">';

    numbers.forEach(num => {
        html += `<div class="lottery-ball">${num}</div>`;
    });

    if (specialNumber) {
        html += `<div class="lottery-ball special">${specialNumber}</div>`;
    }

    html += '</div>';
    html += '</div>';

    html += '</div>';

    dataDiv.innerHTML = html;
}

function formatCurrency(value) {
    if (!value) return 'N/A';

    // Convert to number if string
    const numValue = typeof value === 'string' ? parseInt(value) : value;

    // Format with billion/million
    if (numValue >= 1000000000) {
        return (numValue / 1000000000).toFixed(2) + ' tỷ VNĐ';
    } else if (numValue >= 1000000) {
        return (numValue / 1000000).toFixed(2) + ' triệu VNĐ';
    }

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(numValue);
}

// Load data on page load
window.onload = function() {
    loadJackpot();
};
