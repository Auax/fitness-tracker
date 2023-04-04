import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Heading, useToast, Text, Input, Checkbox, Box, Icon} from 'native-base';
import {Entypo, Feather} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

function BottomBar(props) {
    const navigation = useNavigation();

    return (
        <Box style={styles.bottomBar}>
            <Button variant="ghost" p={3} borderRadius="full">
                <Icon as={Entypo} name="list" size={7} color="#000"/>
            </Button>
            <Button variant="default" p={3} borderRadius={50} onPress={() => navigation.navigate("NewWorkout")}>
                <Icon as={Entypo} name="plus" size={10} color="#fff"/>
            </Button>
            <Button variant="ghost" p={3} borderRadius="full">
                <Icon as={Feather} name="settings" size={7} color="#000"/>
            </Button>
        </Box>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        flex: .1,
        height: 80,
        position: "absolute",
        bottom: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        // borderStyle: "solid",
        // borderTopWidth: 1,
        // borderColor: "#e7e7e7",
    }
});

export default BottomBar;
