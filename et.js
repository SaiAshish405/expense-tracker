document.getElementById('btn').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    if (category && amount && date) {
        const tableBody = document.getElementById('Tbody');

        const newRow = document.createElement('tr');
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        newRow.appendChild(categoryCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = amount;
        newRow.appendChild(amountCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        newRow.appendChild(dateCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            tableBody.removeChild(newRow);
            updateChart();
        });
        deleteCell.appendChild(deleteButton);
        newRow.appendChild(deleteCell);

        tableBody.appendChild(newRow);

        
        document.getElementById('category').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';

        
        updateChart();
    } else {
        alert('Please fill out all fields');
    }
});

const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'red', 'blue', 'green', 'yellow', 'orange'
            ],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black'  
                }
            },
            title: {
                display: true,
                text: 'Expenses by Category',
                color: 'black'  
            }
        }
    }
});

function updateChart() {
    const tableBody = document.getElementById('Tbody');
    const rows = tableBody.getElementsByTagName('tr');
    const expenseData = {};
    let totalAmount = 0;
    
    for (const row of rows) {
        const cells = row.getElementsByTagName('td');
        const category = cells[0].textContent;
        const amount = parseFloat(cells[1].textContent);
        totalAmount += amount;
        
        if (expenseData[category]) {
            expenseData[category] += amount;
        } else {
            expenseData[category] = amount;
        }
    }

    const labels = Object.keys(expenseData);
    const data = Object.values(expenseData);

    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.update();
    document.getElementById('totalAmount').textContent =  totalAmount;
}
