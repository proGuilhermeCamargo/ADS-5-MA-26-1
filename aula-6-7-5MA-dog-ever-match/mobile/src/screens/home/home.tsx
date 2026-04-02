import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { estilo } from './styles';

export const Home = () => {
    const [valueApi, setValueApi] = useState([])

    const requestApi = async () => {
        await axios.get("http://localhost:3000/dogs/getAllDogs").then((resp) => {
            setValueApi(resp.data)
        })
    }

    useEffect(() => {
        requestApi()
    }, [])

    return (
        <View style={estilo.container}>
            <TouchableOpacity style={estilo.content}>
                <Image
                    source={{uri: valueApi[0]?.image[0]}}
                    style={{
                        height: '90%',
                        width: '90%'
                    }}
                />
            </TouchableOpacity>
            <View style={estilo.contentButton}>
                <TouchableOpacity style={estilo.buttonNo}>
                    <AntDesign name="close" size={32} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={estilo.buttonYes}>
                    <AntDesign name="heart" size={32} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}