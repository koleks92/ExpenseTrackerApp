import axios from "axios";

const url = 'https://expense-tracker-app-57c7b-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
    const response = await axios.post(url + '/expenses.json',
    expenseData);
    const id = response.data.name;
    return id;
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

export async function updateExpense(id, expenseData) {
    return axios.put(url + `/expenses/${id}.json`, expenseData);
};

export async function deleteExpense(id) {
    return axios.delete(url + `/expenses/${id}.json`);
};