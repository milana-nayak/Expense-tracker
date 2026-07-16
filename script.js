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

// Load expenses from Local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;
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
                <p>📂 ${expense.category || "Others"}</p>
            </div>

            <div class="buttons">
               <button class="edit-btn">✏ Edit</button>
               <button class="delete-btn">🗑 Delete</button>
            </div>
        `;

        const deleteBtn = li.querySelector(".delete-btn");
        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", function () {

            nameInput.value = expense.name;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;

    editIndex = index;

    form.querySelector("button").textContent = "Update Expense";
});
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

    if (
        name === "" ||
        amount <= 0 ||
        category === "" ||
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    const newExpense = {
        name,
        amount,
        category,
    };

    if(editIndex === -1){

    expenses.push(newExpense);

}else{

    expenses[editIndex] = newExpense;

    editIndex = -1;

    form.querySelector("button").textContent = "Add Expense";
}

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
filterCategory.addEventListener("change", loadExpenses);
// Initial Load
loadExpenses();
