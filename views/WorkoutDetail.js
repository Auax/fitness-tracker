import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {GlobalStyles} from "../components/Styles";


const WorkoutView = ({route}) => {
    // Set workout data
    const fetchedWorkout = route.params.workout;
    // Convert to array of objects [{},{},...]
    const muscleGroupsArr = Object.entries(fetchedWorkout["muscleGroups"]).map(([name]) => ({[name]: []}));

    const [workout, setWorkout] = useState(muscleGroupsArr);

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
            weight: '',
            reps: '',
        };
        const updatedWorkouts = [...workout];
        updatedWorkouts[workoutIndex].exercises = [...updatedWorkouts[workoutIndex].exercises, newExercise];
        setWorkout(updatedWorkouts);
    };

    const renderItem = ({item, index}) => (
        <View style={styles.workoutContainer}>
            <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{Object.entries(item)}</Text>
            </View>
            <FlatList
                data={item.exercises}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardText}>{item.weight}</Text>
                        <Text style={styles.cardText}>{item.reps}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => addExercise(index)}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={GlobalStyles.container}>
            <Text style={styles.heading}>Workout View</Text>
            <TouchableOpacity style={styles.addButton} onPress={addMuscleGroup}>
                <Text style={styles.addButtonText}>Add Body Part</Text>
            </TouchableOpacity>
            <FlatList
                data={workout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,

    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        // backgroundColor: '#0e0e0e',
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
    workoutContainer: {
        // backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingVertical: 10,
        // paddingHorizontal: 30,
        marginTop: 10,
        shadowColor: '#000',
    },
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: "#f0f0f0",
        borderWidth: 1,
        borderStyle: "solid",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default WorkoutView;