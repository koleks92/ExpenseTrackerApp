import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Input({label, textInputConfig}) {
    return (
    <View>
        <Text>{label}</Text>
        <TextInput {...textInputConfig} />
    </View>
    )
};

export default Input;