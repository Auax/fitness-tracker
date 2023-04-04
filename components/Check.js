import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Checkbox from "expo-checkbox";

const Check = (props) => {
    return (
        <View style={styles.checkContainer}>
            <Checkbox
                style={styles.checkbox}
                checked={props.isChecked}
                value={props.isChecked}
                onValueChange={props.setChecked}
                color={props.isChecked ? '#1f1f1f' : undefined}
            />
            <TouchableOpacity onPress={() => props.setChecked(!props.isChecked)}>
                <Text style={styles.checkText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    checkContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    checkText: {
        fontSize: 15
    },
    checkbox: {
        marginHorizontal: 8,
        borderWidth: 1
    },
});

export default Check;