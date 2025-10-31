function updateFooter() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Replace with your actual student name
    const studentName = "Trịnh Thanh An";
    document.getElementById('footerText').textContent = `Designed by ${studentName}, today is ${dateTimeString}`;
}

// Update footer every second
updateFooter();
setInterval(updateFooter, 1000);
