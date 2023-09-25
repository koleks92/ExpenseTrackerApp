import axios from "axios";

export function storeExpense(expenseData) {
    axios.post('https://expense-tracker-app-57c7b-default-rtdb.firebaseio.com/expenses.json',
    expenseData);
};