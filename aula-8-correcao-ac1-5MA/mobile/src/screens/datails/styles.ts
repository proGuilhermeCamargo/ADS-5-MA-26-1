import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentImage: {
        height: 120,
        width: 120,
        backgroundColor: '#FFA500',
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    contentInfo: {
        width: '80%',
        backgroundColor: '#FFA500',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
    },
    info: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        height: 50,
        width: '100%',
        textAlign: 'left',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    }
})