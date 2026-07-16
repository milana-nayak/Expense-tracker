const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const filterCategory = document.getElementById("filter-category");

const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
const transactionElement = document.getElementById("transactions");
const highestElement = document.getElementById("highest");
const emptyMessage = document.getElementById("empty-message");

const submitBtn = document.getElementById("submit-btn");

// Load expenses from Local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

// Display Expenses
function loadExpenses() {

    expenseList.innerHTML = "";

    let total = 0;
    let highest = 0;

    // Dashboard calculations (all expenses)
    expenses.forEach(expense => {
        total += Number(expense.amount);

        if (Number(expense.amount) > highest) {
            highest = Number(expense.amount);
        }
    });

    totalElement.textContent = total.toLocaleString("en-IN");
    transactionElement.textContent = expenses.length;
    highestElement.textContent = highest.toLocaleString("en-IN");

    if (expenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    // Display Expenses
    expenses.forEach((expense, index) => {

        const selectedCategory = filterCategory.value;

        if (
            selectedCategory !== "All" &&
            expense.category !== selectedCategory
        ) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>💰 ₹${Number(expense.amount).toLocaleString("en-IN")}</p>
                <p>📂 ${expense.category}</p>
            </div>

            <div class="buttons">
                <button class="edit-btn">✏ Edit</button>
                <button class="delete-btn">🗑 Delete</button>
            </div>
        `;

        // Edit
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        editBtn.addEventListener("click", function () {

            nameInput.value = expense.name;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;

            editIndex = index;

            submitBtn.textContent = "Update Expense";
        });

        // Delete

        deleteBtn.addEventListener("click", function () {
            deleteExpense(index);
        });

        expenseList.appendChild(li);
    });
}

// Add / Update Expense
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (
        name === "" ||
        amount <= 0 ||
        category === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    const newExpense = {
        name,
        amount,
        category
    };

    if (editIndex === -1) {

        expenses.push(newExpense);

    } else {

        expenses[editIndex] = newExpense;

        editIndex = -1;

        submitBtn.textContent = "Add Expense";
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();

    loadExpenses();
});

// Delete Expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpenses();
}

// Filter
filterCategory.addEventListener("change", loadExpenses);

// Initial Load
loadExpenses();
