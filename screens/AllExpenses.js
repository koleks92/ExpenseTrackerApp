import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {
    return (
        <View>
            <ExpensesOutput expensesPeriod="Total"/>
        </View>
    )
};

export default AllExpenses;