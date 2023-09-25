import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Book',
        amount: 44.44,
        date: new Date('2021-12-19'), 
    },
    {
        id: 'e2',
        description: 'Haircut',
        amount: 15.44,
        date: new Date('2022-05-22'), 
    },
    {
        id: 'e3',
        description: 'Knife',
        amount: 120.22,
        date: new Date('2022-09-19'), 
    },
    {
        id: 'e4',
        description: 'Monitor',
        amount: 499.99,
        date: new Date('2023-09-20'), 
    },
    {
        id: 'e5',
        description: 'Frying pan',
        amount: 29.99,
        date: new Date('2022-09-09'), 
    },
    
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
};

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch( { type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch( { type: 'UPDATE', payload: { id: id, data: expenseData }})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };


    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
};

export default ExpensesContextProvider;