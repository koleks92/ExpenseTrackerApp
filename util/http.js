import axios from "axios";

const url = 'https://expense-tracker-app-57c7b-default-rtdb.firebaseio.com'

export function storeExpense(expenseData) {
    axios.post(url + '/expenses.json',
    expenseData);
};

export async function fetchExpenses() {
    const response = await axios.get(url + '/expenses.json');

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key, 
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }
    return expenses;
}

