import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import Navbar from "../components/Navbar";
import {Heading, Icon} from "native-base";
import {Feather} from '@expo/vector-icons';
import {Box, Text} from "native-base";


const WorkoutView = ({route}) => {
    const [editMode, setEditMode] = useState(false);
    const [workout, setWorkout] = useState([]);

    useEffect(() => {
        // Set workout data
        const fetchedWorkout = route.params.workout;
        // Convert to array of objects [{},{},...]
        const muscleGroupsArr = fetchedWorkout["muscleGroups"];
        setWorkout(muscleGroupsArr);
    }, []);

    // Create a new muscle group and commit to db
    const addMuscleGroup = () => {
        const newWorkout = {
            id: `${workout.length + 1}`,
            workoutName: 'New Workout',
            exercises: [],
        };
        setWorkout([...workout, newWorkout]);
    };

    // Add a new exercise and commit to db
    const addExercise = (workoutIndex) => {
        const newExercise = {
            id: `${workout[workoutIndex].exercises.length + 1}`,
            name: 'New Exercise',
            weight: '10',
            reps: '20',
        };
        const updatedWorkouts = [...workout];
        updatedWorkouts[workoutIndex].exercises = [...updatedWorkouts[workoutIndex].exercises, newExercise];
        setWorkout(updatedWorkouts);
    };

    const customBtn = (
        <Box style={styles.editBtn}>
            <Icon as={Feather} name="edit-2" size={6} color={editMode ? "blue.500" : "#000"}/>
        </Box>
    );

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.workoutContainer}>
                <Heading fontSize={20} mb={2}>{item.name}</Heading>
                <FlatList
                    data={item.exercises}
                    renderItem={({item}) => (
                        <View style={styles.card}>
                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                <Text style={styles.exerciseTextInfo}>{item.weight} kg</Text>
                                <Text fontSize={15} color="#6e6e6e">x</Text>
                                <Text style={styles.exerciseTextInfo}>{item.reps} reps</Text>
                            </Box>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
                {editMode &&
                    <TouchableOpacity style={styles.addButton} onPress={() => addExercise(index)}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>}
            </View>
        )
    };

    return (
        <SafeAreaView flex={1} style={{backgroundColor: "#fff"}}>
            <Navbar title={route.params.title}
                customBtn={customBtn}
                customBtnName="edit-2"
                customBtnSize={6}
                customBtnCallback={() => setEditMode(!editMode)}
            />
            <Box style={styles.container}>
                <Text style={styles.heading}>Workout View</Text>
                {editMode && <TouchableOpacity style={styles.addButton} onPress={addMuscleGroup}>
                    <Text style={styles.addButtonText}>Add Body Part</Text>
                </TouchableOpacity>}
                <FlatList
                    data={workout}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </Box>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        zIndex: 1,
        backgroundColor: "#f1f1f1"
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        borderColor: "#0773d2",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 6,
        padding: 10,
    },
    addButtonText: {
        color: '#0773d2',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    editBtn: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
    },
    workoutContainer: {
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 10,
    },
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

export default WorkoutView;