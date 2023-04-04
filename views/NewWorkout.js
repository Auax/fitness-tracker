import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Heading, useToast, Text, Input, Checkbox, Box} from 'native-base';
import {createWorkout, fetchWorkouts} from "../SQL/CreateSQLDatabase";
import {useNavigation} from "@react-navigation/native";
import {GlobalStyles} from "../components/Styles";

function NewWorkout(props) {
    const navigation = useNavigation();
    const toast = useToast();

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
        if (workoutName.length <= 0) {
            toast.show({
                render: () => {
                    return <Box bg="red.100" px="3" py="2" rounded="sm" mb={5}>
                        Please enter a name!
                    </Box>;
                }
            });
            return;
        }
        createWorkout(props.db, workoutName, "2023-04-02", "18:00");
        fetchWorkouts(props.db).catch(console.error);
        props.triggerUpdate();
        navigation.navigate("Workouts");
    }

    return (
        <View style={GlobalStyles.container}>
            <Heading>Create a new workout</Heading>
            <Input
                variant="default"
                size="md"
                my={3}
                placeholder="Workout name"
                onChangeText={(text) => setWorkoutName(text)}
                value={workoutName}
            />

            <Heading size="md">Select body parts:</Heading>
            {muscleGroups.map((muscleGroup, index) => (
                <Checkbox isChecked={muscleGroup.isChecked} onChange={() => handleCheckChange(index)}
                          colorScheme="dark" my={1} size="sm">
                    {muscleGroup.name}
                </Checkbox>
            ))}

            <Button variant="default" mt={3} onPress={handleSaveWorkout}>
                <Text color="white" fontWeight="semibold">Create</Text>
            </Button>

        </View>
    );
}


export default NewWorkout;
