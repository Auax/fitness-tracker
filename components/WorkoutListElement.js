import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";

const WorkoutListElement = (props) => {
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false);

    const handleLongPress = () => {

    }

    return (
        <TouchableOpacity style={styles.workout}
                          onPress={() => navigation.navigate("WorkoutDetails")}
                          onLongPress={handleLongPress}
        >
            <Text style={styles.workoutText}>{props.name}</Text>
            <Icon name="right" size={15}/>
        </TouchableOpacity>
    )
};

export default WorkoutListElement;

const styles = StyleSheet.create({
    workout: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#f1f1f1",
        padding: 17,
        marginVertical: 5,
        borderRadius: 6
    },
    workoutText: {
        fontWeight: 500
    }
});