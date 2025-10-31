function loadPage(page) {
    // Load page in main content iframe
    document.getElementById('mainContent').src = page;

    // Update active state
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.classList.remove('active');
    });

    // Add active to clicked item
    event.target.classList.add('active');
}
