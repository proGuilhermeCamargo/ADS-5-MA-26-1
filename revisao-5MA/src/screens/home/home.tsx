import { BotaoDaLista } from '@/src/components/botao-da-lista/botao-da-lista'
import axios from 'axios'
import { useEffect, useState } from "react"
import { FlatList, ScrollView, TextInput } from "react-native"

export const Home = () => {
    const [respostaApi, setRespostaApi] = useState([])
    const [filtro, setFiltro] = useState("")

    const chamaApi = async () => {
        await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filtro}`)
        .then((resp) => {
            setRespostaApi(resp.data)
        })
    }

    useEffect(() => {
      chamaApi()  
    }, [filtro])
    
    return (
        <ScrollView>
            <TextInput
                onChangeText={setFiltro}
                value={filtro}
                style={{
                    height: 100,
                    width: 500,
                    borderWidth: 1
                }}
            />
            <FlatList
                data={respostaApi?.meals}
                renderItem={({item}) => {
                    return (
                       <BotaoDaLista item={item}/>
                    )
                }}
            />
        </ScrollView>
    )
}