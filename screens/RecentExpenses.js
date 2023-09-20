import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function RecentExpenses() {
    return (
        <View>
            <ExpensesOutput expensesPeriod="Last 7 days" />
        </View>
    )
};

export default RecentExpenses;