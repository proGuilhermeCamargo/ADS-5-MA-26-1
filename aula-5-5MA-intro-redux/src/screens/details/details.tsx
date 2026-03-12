import { RootState } from "@/src/store/store"
import { Text, View } from "react-native"
import { useSelector } from "react-redux"




export const Details = () => {
    const valorDoContador = useSelector((state: RootState) => state.counter.value)

    return (
        <View>
            <Text>{valorDoContador}</Text>
        </View>
    )
}