import { View, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDay } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);

    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }

        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onPress={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }


    const RecentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDay(today, 7);

        return expense.date > date7DaysAgo;
    });

    return (
            <ExpensesOutput expenses={RecentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses registered for the last 7 days"/>

    )
};

export default RecentExpenses;