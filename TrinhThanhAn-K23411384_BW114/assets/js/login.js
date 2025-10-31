// Check if user is already logged in on page load
window.onload = function() {
    checkLoginStatus();
};

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginTime = localStorage.getItem('loginTime');

    if (loggedInUser) {
        showLogoutSection(loggedInUser, loginTime);
    } else {
        showLoginSection();
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username.trim() === '' || password.trim() === '') {
        showError('Please enter both username and password');
        return;
    }

    if (password.length < 4) {
        showError('Password must be at least 4 characters');
        return;
    }

    // Save login info to localStorage
    const loginTime = new Date().toLocaleString('vi-VN');
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loginTime', loginTime);

    // Show logout section
    showLogoutSection(username, loginTime);
});

function showLoginSection() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('logoutSection').classList.add('hidden');
    const errorMsg = document.getElementById('errorMessage');
    if (errorMsg) {
        errorMsg.classList.add('hidden');
    }
}

function showLogoutSection(username, loginTime) {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('logoutSection').classList.remove('hidden');
    document.getElementById('displayUsername').textContent = username;
    document.getElementById('loginTime').textContent = loginTime;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function logout() {
    // Remove login info from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loginTime');

    // Reset form
    document.getElementById('loginForm').reset();

    // Show login section
    showLoginSection();
}
