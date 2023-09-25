import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { useState } from 'react';


function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '',
                isValid: true },
        date: {value: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
                isValid: true },
        description: {value: defaultValues ? defaultValues.description.toString() : '',
                isValid: true }
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true}
            };
        });

    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid =!isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')<,
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid},
                    date: { value: currentInputs.date.value, isValid: dateIsValid},
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid}
                }
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
    <View>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value
            }}/>
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }}/>
        </View>
        <Input label="Description" textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
        }}/>
        {formIsInvalid && <Text>Invalid input</Text>}
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