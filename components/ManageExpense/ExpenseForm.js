import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { useState } from 'react';


function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
        description: defaultValues ? defaultValues.description.toString() : ''
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            };
        });

    };

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        const amountIsValid =!isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values')
            return;
        }

        onSubmit(expenseData);
    }

    return (
    <View>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputValues['amount']
            }}/>
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValues['date']
            }}/>
        </View>
        <Input label="Description" textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputValues['description']
        }}/>
        <View style={styles.buttons}>
            <Button mode='flat' style={styles.button} onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
    },  
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    rowInput: {
        flex: 1
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
});