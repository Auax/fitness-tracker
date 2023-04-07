import React from 'react';
import {Box, Heading, Icon, Text} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const Navbar = (props) => {
    const navigation = useNavigation();

    return (
        <Box style={styles.container}>
            <Box style={[StyleSheet.absoluteFill, styles.header]}>
                <Heading>
                    {props.title}
                </Heading>
            </Box>
            <TouchableOpacity onPress={() => navigation.navigate("Workouts")}>
                <Icon as={Ionicons} name="chevron-back" size={7} color="#000"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.customBtnCallback}>
                {props.customBtn && props.customBtn}
            </TouchableOpacity>
        </Box>
    );
};

Navbar.defaultProps = {
    customBtn: null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: 60,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Navbar;