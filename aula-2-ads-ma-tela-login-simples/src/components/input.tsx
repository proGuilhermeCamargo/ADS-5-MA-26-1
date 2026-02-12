import { StyleSheet, Text, TextInput, View } from "react-native"

interface IProps {
    label: string,
    value: string,
    setValue: (value: string) => void
}

export const Input = ({label, value, setValue}: IProps) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput 
                value={value} 
                onChangeText={setValue} 
                style={estilo.styleInput}
            />
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleInput: {
        height: 52,
        width: 200,
        borderWidth: 1,
        borderRadius: 8
    }
})