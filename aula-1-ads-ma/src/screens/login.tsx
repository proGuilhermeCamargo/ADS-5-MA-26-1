import { StyleSheet, Text, TextInput, View } from 'react-native'


export const Login = () => {
    return (
        <View style={estilo.container}>
            <Text>E-mail:</Text>
            <TextInput style={estilo.styleInput}/>

            <Text>Senha:</Text>
            <TextInput style={estilo.styleInput}/>
            
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