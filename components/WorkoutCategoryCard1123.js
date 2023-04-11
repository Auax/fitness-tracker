import React from 'react';
import {Box, Text} from "native-base";
import {StyleSheet, TouchableOpacity, View} from "react-native";

const WorkoutCategoryCard = (props) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                <Text style={styles.exerciseTextInfo}>{props.weight} kg</Text>
                <Text fontSize={15} color="#6e6e6e">x</Text>
                <Text style={styles.exerciseTextInfo}>{props.reps} reps</Text>
            </Box>
            <Text style={styles.cardTitle}>{props.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 25,
        marginBottom: 10,
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