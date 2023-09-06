let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const transactionTypeSelect = document.getElementById('transaction-type');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalExpensesElement = document.getElementById('total-expenses');
const totalEarningsElement = document.getElementById('total-earnings');
const modal = document.getElementById('transaction-modal');
const transactionDetails = document.getElementById('transaction-details');
const closeBtn = document.querySelector('.close-btn');

// Event listeners
addBtn.addEventListener('click', addTransaction);
expensesTableBody.addEventListener('click', deleteTransaction);
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Add new transaction
function addTransaction() {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const transactionType = transactionTypeSelect.value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
        alert('Please fill in all the fields correctly.');
        return;
    }

    const expense = { category, amount, date, type: transactionType };
    expenses.push(expense);

    if (transactionType === 'expense') {
        totalAmount -= amount;
        totalExpensesElement.textContent = `-$${Math.abs(totalAmount).toFixed(2)}`;
    } else {
        totalAmount += amount;
        totalEarningsElement.textContent = `$${totalAmount.toFixed(2)}`;
    }

    renderTable();
    showModal(transactionType, category, amount, date);
}

function renderTable() {
    expensesTableBody.innerHTML = '';
    for (let expense of expenses) {
        const newRow = expensesTableBody.insertRow();

        newRow.insertCell().innerText = expense.category;
        newRow.insertCell().innerText = expense.type === 'expense' ? `-$${expense.amount.toFixed(2)}` : `$${expense.amount.toFixed(2)}`;
        newRow.insertCell().innerText = expense.date;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        newRow.insertCell().appendChild(deleteButton);
    }
}

function deleteTransaction(event) {
    if (event.target.classList.contains('delete-btn')) {
        const rowIndex = event.target.closest('tr').rowIndex - 1;
        const expense = expenses[rowIndex];

        if (expense.type === 'expense') {
            totalAmount += expense.amount;
        } else {
            totalAmount -= expense.amount;
        }

        expenses.splice(rowIndex, 1);
        renderTable();

        totalExpensesElement.textContent = `-$${Math.abs(totalAmount).toFixed(2)}`;
        totalEarningsElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
}

function showModal(transactionType, category, amount, date) {
    transactionDetails.textContent = `You added a ${transactionType} for ${category} of $${amount.toFixed(2)} on ${date}.`;
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', renderTable);


