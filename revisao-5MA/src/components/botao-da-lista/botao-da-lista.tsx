import { router } from "expo-router"
import { Image, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"

export const BotaoDaLista = ({item}) => {
    return (
         <TouchableOpacity
            style={styles.styleButto}
            onPress={() => router.push({
                pathname: "/details",
                params: { item: JSON.stringify(item) }
            })}
            >
            <Image
                style={styles.styleImage}
                source={{uri: item?.strMealThumb}}
            />
            <Text style={styles.styleText}>{item?.strMeal}</Text>
        </TouchableOpacity>
    )
}