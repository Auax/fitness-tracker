import {StyleSheet} from "react-native";

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10
    },
    input: {
        height: 40,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#1f1f1f',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: '#fff',
    },
});