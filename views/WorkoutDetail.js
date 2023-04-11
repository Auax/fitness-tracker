import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import Navbar from "../components/Navbar";
import {Icon} from "native-base";
import {Feather} from '@expo/vector-icons';
import {Box, Text} from "native-base";
import WorkoutCategoryCard from "../components/WorkoutCategoryCard";


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


    const handleOnPressCategory = (index) => {
        console.log(workout[index]);
    }

    const renderItem = ({item, index}) => {
        return (
            <WorkoutCategoryCard name={item.name}
                                 exercicesLength={item.exercises.length}
                                 onPressFallback={() => handleOnPressCategory(index)}/>
        )
    };

    return (
        <SafeAreaView flex={1} style={{backgroundColor: "#fff"}}>
            <Navbar title={route.params.title}/>
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
        backgroundColor: "#f6f6f6"
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
    exerciseTextInfo: {
        fontSize: 15,
        color: "#6e6e6e",
        fontWeight: "bold"
    }
});

export default WorkoutView;