import { useLocalSearchParams } from "expo-router"
import { Image, Text, View } from "react-native"
import {styles} from './styles'
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export const Details = () => {
    const {data} = useLocalSearchParams();
    const dog = useSelector((state: RootState) => state?.counter?.dataDog)

    // const dog = JSON.parse(data as string)


    return (
        <View style={styles.container}>
            <View style={styles.contentImage}>
                <Image 
                    style={styles.image}
                    source={{uri: dog?.image[0]}}
                />
            </View>
            <View style={styles.contentInfo}>
                <Text style={styles.info}>Nome: {dog?.name}</Text>
                <Text style={styles.info}>Descrição: {dog?.description}</Text>
                <Text style={styles.info}>Idade: {dog?.years}</Text>
                <Text style={styles.info}>Contato: {dog?.contact}</Text>
                <Text style={styles.info}>Endereço: {dog?.address}</Text>
                <Text style={styles.info}>Gênero: {dog?.gender}</Text>
                <Text style={styles.info}>Tamanho: {dog?.size}</Text>
            </View>
        </View>
    )
}