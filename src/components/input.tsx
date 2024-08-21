import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({...rest}: TextInputProps){
    return <TextInput
        style={style.input}
        {...rest} />
}

const style = StyleSheet.create({
    input:
    {
        height: 54,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
        paddingHorizontal: 16
    }
});