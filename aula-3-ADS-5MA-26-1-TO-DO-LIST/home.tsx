import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export const Home = () => {
    const [valorText, setValorText] = useState("")
    const [list, setList] = useState<string[]>([])

    console.log("Comprimento do texto", valorText.length)

    const adicionaNaLista = () => {
        if(valorText.length == 0){
            alert("Campo de texto está vazio")
            return
        }
        setList([...list, valorText])
        setValorText("")
    }

    return (
        <View style={estilo.container}>
            <TextInput 
                style={estilo.styleInput} 
                onChangeText={setValorText} 
                value={valorText}
            />

            <ScrollView>
                {
                    list.map((item) => {
                        return (
                            <View>
                                <Text>{item}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>


            {/* <FlatList
              data={list}  
              renderItem={({item}) => {
                return (
                    <View>
                        <Text>{item}</Text>
                    </View>
                )
              }}
            /> */}
            
            <TouchableOpacity onPress={adicionaNaLista} style={estilo.styleButton}>
                <Text style={estilo.styleTextButton}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    styleInput: {
        height: 52,
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12
    },
    styleButton: {
        height: 52,
        width: '100%',
        borderRadius: 8,
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})