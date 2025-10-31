let employees = [];

// Load employees from localStorage on page load
window.onload = function() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        displayEmployees();
    }
};

// Handle form submission
document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const employee = {
        id: document.getElementById('empId').value,
        name: document.getElementById('empName').value,
        phone: document.getElementById('empPhone').value,
        email: document.getElementById('empEmail').value,
        age: parseInt(document.getElementById('empAge').value)
    };

    // Check if employee ID already exists
    if (employees.some(emp => emp.id === employee.id)) {
        alert('Employee ID already exists!');
        return;
    }

    employees.push(employee);
    saveEmployees();
    displayEmployees();

    // Reset form
    this.reset();
});

function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function displayEmployees() {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';

    employees.forEach((employee, index) => {
        const tr = document.createElement('tr');

        // Determine row color based on age
        if (employee.age >= 18 && employee.age <= 35) {
            tr.className = 'age-18-35';
        } else {
            tr.className = 'age-other';
        }

        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.phone}</td>
            <td>${employee.email}</td>
            <td>${employee.age}</td>
            <td>
                <button class="btn-delete" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function deleteEmployee(index) {
    if (confirm('Are you sure you want to delete this providers?')) {
        employees.splice(index, 1);
        saveEmployees();
        displayEmployees();
    }
}
