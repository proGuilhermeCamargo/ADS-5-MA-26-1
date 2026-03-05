import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from "react-native";

export default function App () {
    const [dadoApi, setDadoApi] = useState("")

    const chamaApi = async () => {
        await axios.get("http://localhost:3000/teste").then((resposta) => {
            console.log("RESPOSTA DA API: ", resposta)
            setDadoApi(resposta.data)
        })
    }

    useEffect(() => {
        chamaApi()
    }, [])

    return (
        <View>
            <Text>{dadoApi}</Text>
        </View>
    )
}