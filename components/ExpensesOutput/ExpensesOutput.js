import { Text, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

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
        date: new Date('2022-09-20'), 
    },
    {
        id: 'e5',
        description: 'Frying pan',
        amount: 29.99,
        date: new Date('2022-09-09'), 
    },
    
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
    <View>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
        <ExpensesList />
    </View>);
};

export default ExpensesOutput;