import React from 'react';
import {Box, Image, Text} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";

import ChestIm from "../assets/icon.png";

const WorkoutCategoryCard = (props) => {


    return (
        <TouchableOpacity style={styles.card} onPress={props.onPressFallback}>
            <Box>
                <Text style={styles.cardTitle}>{props.name}</Text>
                <Text style={styles.exerciseTextInfo}>{props.exercicesLength} exercises</Text>
            </Box>
            <Image source={ChestIm} size="md" rounded="lg" alt={props.name}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 20,
        elevation: 5, // This is for Android devices
        shadowColor: '#000', // This is for iOS devices
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exerciseTextInfo: {
        fontSize: 15,
        color: "#6e6e6e",
        fontWeight: "bold"
    }
});

export default WorkoutCategoryCard;