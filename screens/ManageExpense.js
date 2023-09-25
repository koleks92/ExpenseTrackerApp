import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({ route, navigation }) {

    expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
                title: isEditing ? 'Edit Expense' : 'Add Expense'
            });
    }, [navigation, isEditing])

    function cancelHandler() {
        console.log("CANCEL");
        navigation.goBack();
    };

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {description: 'Text22', amount: 29.99, date: new Date('2023-09-22')});
        } else {
            expensesCtx.addExpense({description: 'Text', amount: 19.99, date: new Date('2023-09-23')});
        }
        navigation.goBack();
    };

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler}/>

            {isEditing && 
            <View style={styles.deleteContainer}>
                <IconButton 
                    icon="trash" 
                    color={GlobalStyles.colors.error500} 
                    size={36} 
                    onPress={deleteExpenseHandler}
                />
            </View>     
            }
        </View>
    )
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },    


})