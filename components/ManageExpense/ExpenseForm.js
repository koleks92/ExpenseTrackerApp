import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import { useState } from 'react';


function ExpenseForm() {
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });


    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            };
        });

    };

    function dateChangeHandler() {

    };

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
    }
});