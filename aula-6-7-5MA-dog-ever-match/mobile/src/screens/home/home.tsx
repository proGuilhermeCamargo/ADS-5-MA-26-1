import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { estilo } from './styles';
import { router } from 'expo-router';

export interface IList {
    image: string[];
    id: number;
    name: string;
    description: string;
    years: number;
    contact: string;
    address: string;
    gender: any;
    size: any;
}

export const Home = () => {
    const [valueApi, setValueApi] = useState<IList[]>([])
    const [match, setMatch] = useState<IList[]>([])
    const [showMatch, setShowMatch] = useState(false)

    const requestApi = async () => {
        await axios.get("http://localhost:3000/dogs/getAllDogs").then((resp) => {
            setValueApi(resp.data)
        })
    }

    useEffect(() => {
        requestApi()
    }, [])

    const handlePressYes = () => {
        setMatch((prevState) => [...prevState, valueApi[0]])
        setValueApi((prevState) => prevState.slice(1))
    }

    const handlePressNo = () => {
        setValueApi((prevState) => prevState.slice(1))
    }

    return (
        <View style={estilo.container}>
           {
            showMatch ? 
            <>
              <FlatList
                data={match}
                renderItem={({item}) => {
                    return (
                        <Image
                            source={{uri: item?.image[0]}}
                            style={{
                                height: 200,
                                width: 200
                            }}
                            resizeMode='contain'
                        />
                    )
                }}  
              />  
            </>
            :
            <>
                <TouchableOpacity onPress={() => router.navigate("/details")} style={estilo.content}>
                    <Image
                        source={{uri: valueApi[0]?.image[0]}}
                        style={{
                            height: '90%',
                            width: '90%'
                        }}
                    />
                </TouchableOpacity>
                <View style={estilo.contentButton}>
                    <TouchableOpacity onPress={handlePressNo} style={estilo.buttonNo}>
                        <AntDesign name="close" size={32} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressYes} style={estilo.buttonYes}>
                        <AntDesign name="heart" size={32} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </>

           }
            <Button
                title='Ver Matchs'
                onPress={() => setShowMatch(!showMatch)}
            />
        </View>
    )
}