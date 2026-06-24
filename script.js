const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const dateInput = document.getElementById("expense-date");
const emptyMessage = document.getElementById("empty-message");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

if(expenses.length===0){
    emptyMessage.style.display="block";
}
else{
    emptyMessage.style.display="none";
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

// Load saved expenses on page load
function loadExpenses() {
  expenseList.innerHTML = "";
  total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

   li.innerHTML = `
<div class="expense-info">
    <h3>${expense.name}</h3>

    <p>💰 ₹${expense.amount.toLocaleString("en-IN")}</p>

    <p>📂 ${expense.category}</p>

    <p>📅 ${expense.date}</p>
</div>

<button class="delete-btn">🗑</button>
`;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {
      deleteExpense(index);
    });

    expenseList.appendChild(li);

    total += expense.amount;
  });

  totalElement.textContent = total;
}

// Add new expense
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "" || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

const newExpense = {
    name: name,
    amount: amount,
    category: categoryInput.value,
    date: dateInput.value
};
  
  expenses.push(newExpense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  loadExpenses();

  nameInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
dateInput.value = "";
});

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  loadExpenses();
}

// Initial load
loadExpenses();
