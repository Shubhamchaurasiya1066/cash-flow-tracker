let salary = 0
let expenses = JSON.parse(localStorage.getItem("expenses")) || []
let chart;

function setSalary() {
  let input = document.getElementById("salaryInput").value

  if (input === "" || input < 0) {
    alert("Enter valid salary")
    return
  }

  salary = Number(input)
  localStorage.setItem("salary", salary)

  document.getElementById("salary").innerText = salary

  updateBalance()
  updateChart()
}

function addExpense() {
  let name = document.getElementById("expenseName").value
  let amount = document.getElementById("expenseAmount").value

  if (name === "" || amount === "" || amount < 0) {
    alert("Invalid input")
    return
  }

  let expense = {
    name: name,
    amount: Number(amount)
  }

  expenses.push(expense)

  localStorage.setItem("expenses", JSON.stringify(expenses))

  displayExpenses()
  updateBalance()
  updateChart()
}

// Display Expenses
function displayExpenses() {
  let list = document.getElementById("expenseList")
  list.innerHTML = ""

  expenses.forEach((exp, index) => {
    let li = document.createElement("li")

    li.innerHTML = `
      ${exp.name} - ₹${exp.amount}
      <button onclick="deleteExpense(${index})">🗑️</button>
    `

    list.appendChild(li)
  })
}

function deleteExpense(index) {
  expenses.splice(index, 1)

  localStorage.setItem("expenses", JSON.stringify(expenses))

  displayExpenses()
  updateBalance()
  updateChart()
}

function updateBalance() {
  let total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  document.getElementById("totalExpense").innerText = total
  document.getElementById("balance").innerText = salary - total
}

function updateChart() {
  let totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  let remaining = salary - totalExpense

  let ctx = document.getElementById("myChart")

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Expenses", "Remaining"],
      datasets: [{
        data: [totalExpense, remaining],
        backgroundColor: ["red", "green"]
      }]
    }
  })
}

window.onload = function () {
  salary = Number(localStorage.getItem("salary")) || 0;

  document.getElementById("salary").innerText = salary

  displayExpenses()
  updateBalance()
  updateChart()
};