import { useGlobalSearchParams } from "expo-router"
import { Image, Text, View } from "react-native"

export const Details = () => {
    const params = useGlobalSearchParams()

    const itemDaReceita = JSON.parse(params?.item)

    console.log('itemDaReceita',itemDaReceita)
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: "center"
        }}>
            <Image
                source={itemDaReceita?.strMealThumb}
                style={{
                    height: 500,
                    width: 500,
                    borderRadius: 50
                }}
            />
            <Text style={{
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 'bold'
            }}>{itemDaReceita?.strMeal}</Text>
            <Text>{itemDaReceita?.strInstructions}</Text>
        </View>
    )
}