import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import WorkoutListElement from "../components/WorkoutListElement";
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from "@react-navigation/native";
import {GlobalStyles} from "../components/Styles";

const Home = (props) => {
    const navigation = useNavigation();

    const handleDelete = (key) => {
        console.log("Delete");
    };

    // To render when there is no workout data
    const noWorkoutsRender = (
        <View style={styles.noWorkoutContainer}>
            <Image source={require('../assets/icon.png')} style={styles.logo}/>
            <Text style={GlobalStyles.title}>Fitness Tracker</Text>
            <TouchableOpacity style={GlobalStyles.button} onPress={() => navigation.navigate("NewWorkout")}>
                <Text style={GlobalStyles.buttonText}>New Workout</Text>
            </TouchableOpacity>
        </View>

    );

    // After creating a single workout instance
    const workoutsRender = (
        <View style={styles.workoutContainer}>
            <View style={styles.titleContainer}>
                <Text style={GlobalStyles.title}>Your workouts</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewWorkout")}>
                    <Icon name="plus" size={24}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={props.workouts}
                renderItem={({item}) => <WorkoutListElement key={item.name} name={item.name}/>}
                keyExtractor={(item) => item.key}
            />
        </View>
    );

    return props.workouts.length > 0 ? workoutsRender : noWorkoutsRender;
};

export default Home;

const styles = StyleSheet.create({
    noWorkoutContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    workoutContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    addButton: {
        justifyContent: "center",
    },
    listItem: {
        padding: 16,
        backgroundColor: '#fff',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    deleteButtonText: {
        color: '#fff',
    },
});