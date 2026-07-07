const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const dateInput = document.getElementById("expense-date");

const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
const transactionElement = document.getElementById("transactions");
const highestElement = document.getElementById("highest");
const emptyMessage = document.getElementById("empty-message");

// Load expenses from Local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to display expenses
function loadExpenses() {

    expenseList.innerHTML = "";

    let total = 0;
    let highest = 0;

    if (expenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    expenses.forEach((expense, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>💰 ₹${Number(expense.amount).toLocaleString("en-IN")}</p>
                <p>📂 ${expense.category || "Others"}</p>
                <p>📅 ${expense.date || "-"}</p>
            </div>

            <button class="delete-btn">🗑</button>
        `;

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {
            deleteExpense(index);
        });

        expenseList.appendChild(li);

        total += Number(expense.amount);
        if (Number(expense.amount) > highest) {
          highest = Number(expense.amount);
}
    });

    totalElement.textContent = total.toLocaleString("en-IN");
    transactionElement.textContent = expenses.length;
    highestElement.textContent = highest.toLocaleString("en-IN");
}

// Add Expense
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (
        name === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    const newExpense = {
        name,
        amount,
        category,
        date
    };

    expenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpenses();

    form.reset();
});

// Delete Expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpenses();
}

// Initial Load
loadExpenses();
