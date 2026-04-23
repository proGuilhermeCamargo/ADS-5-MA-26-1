import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeToken = async (token: string) => {
    try { 
        await AsyncStorage.setItem("token", token)
    } catch (err) {
        console.log("Erro ao salvar token", err)
    }
}

export const getToken = async () => {
    return await AsyncStorage.getItem("token")
}

export const removeToken = async () => {
    return await AsyncStorage.clear()
}