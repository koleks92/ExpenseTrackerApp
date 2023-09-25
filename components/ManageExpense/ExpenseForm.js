import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';


function ExpenseForm() {
    function amountChangeHandler() {

    };

    function dateChangeHandler() {

    };

    return (
    <View>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler
            }}/>
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onCHangeText: dateChangeHandler,
            }}/>
        </View>
        <Input label="Description" textInputConfig={{
            multiline: true,

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