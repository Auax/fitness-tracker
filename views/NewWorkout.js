import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Check from "../components/Check";
import {createWorkout, fetchWorkouts} from "../SQL/CreateSQLDatabase";
import {useNavigation} from "@react-navigation/native";
import {GlobalStyles} from "../components/Styles";

function NewWorkout(props) {
    const navigation = useNavigation();

    const [workoutName, setWorkoutName] = useState('');
    const [muscleGroups, setMuscleGroups] = useState([
        {name: 'Chest', isChecked: false},
        {name: 'Back', isChecked: false},
        {name: 'Arms', isChecked: false},
        {name: 'Shoulders', isChecked: false},
        {name: 'Legs', isChecked: false},
        {name: 'Abdominal', isChecked: false}
    ]);

    const handleCheckChange = (index) => {
        const updatedMuscleGroups = [...muscleGroups];
        updatedMuscleGroups[index].isChecked = !updatedMuscleGroups[index].isChecked;
        setMuscleGroups(updatedMuscleGroups);
    };

    const handleSaveWorkout = () => {
        createWorkout(props.db, workoutName, "2023-04-02", "18:00");
        fetchWorkouts(props.db).catch(console.error);
        props.triggerUpdate();
        navigation.navigate("Workouts");
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Create a new workout</Text>
            <TextInput
                style={GlobalStyles.input}
                placeholder="Workout name"
                onChangeText={(text) => setWorkoutName(text)}
                value={workoutName}
            />

            <Text style={GlobalStyles.subtitle}>Select body parts:</Text>
            {muscleGroups.map((muscleGroup, index) => (
                <Check
                    key={muscleGroup.name}
                    text={muscleGroup.name}
                    isChecked={muscleGroup.isChecked}
                    setChecked={() => handleCheckChange(index)}
                />
            ))}

            <TouchableOpacity style={GlobalStyles.button} onPress={handleSaveWorkout}>
                <Text style={GlobalStyles.buttonText}>Create</Text>
            </TouchableOpacity>

        </View>
    );
}


export default NewWorkout;
