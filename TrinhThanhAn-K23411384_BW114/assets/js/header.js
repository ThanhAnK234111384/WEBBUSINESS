function loadPage(page) {
    // Update active state - remove from all items
    const allLinks = document.querySelectorAll('.menu-item, .dropdown-content a');
    allLinks.forEach(item => {
        item.classList.remove('active');
    });

    // Add active to clicked item (this won't work perfectly for dropdown items, but it's a start)
    // The page will be loaded in the main content iframe
    parent.document.getElementById('mainContent').src = page;
}

// Set default active state for About me
window.onload = function() {
    document.querySelector('.menu-item').classList.add('active');
};
