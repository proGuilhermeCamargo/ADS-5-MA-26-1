import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Input } from '../components/input'


export const Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <View style={estilo.container}>
            <Image 
                source={require("../assets/logo.png")}
                style={estilo.styleLogo}
                resizeMode='contain'
            />
            <Input 
                label={"Email:"} 
                value={email}
                setValue={setEmail}
            />
            <Text>{email}</Text>
            <Input 
                label={"Senha:"} 
                value={senha}
                setValue={setSenha}
            />
            <Text>{senha}</Text>
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
    },
    styleLogo: {
        height: 100,
        width: 200,
    }
})