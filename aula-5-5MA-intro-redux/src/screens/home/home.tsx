import { decrement, increment, incrementByAmount } from "@/src/store/slice/counter"
import { RootState } from "@/src/store/store"
import { router } from "expo-router"
import { Button, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

export const Home = () => {
    const valorDoContador = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <View>
            <Button
                title="+"
                onPress={() => dispatch(increment())}
            />

            <Text>{valorDoContador}</Text>
            <Button
                title="-"
                onPress={() => dispatch(decrement())}
            />
            <Button
                title="Soma pelo numero definido"
                onPress={() => dispatch(incrementByAmount(100))}
            />
            <Button
                title="Navega para a outra tela"
                onPress={() => router.push("/details")}
            />
        </View>
    )
}