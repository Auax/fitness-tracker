import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Heading, useToast, Text, Input, Checkbox, Box} from 'native-base';
import {createWorkout} from "../SQL/CreateSQLDatabase";
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

    const showErrorToast = (msg: string) => {
        toast.show({
            placement: "top",
            render: () => {
                return <Box bg="red.100" px="3" py="2" rounded="sm" mb={5}>
                    {msg}
                </Box>;
            }
        });
    }

    const handleCheckChange = (index) => {
        const updatedMuscleGroups = [...muscleGroups];
        updatedMuscleGroups[index].isChecked = !updatedMuscleGroups[index].isChecked;
        setMuscleGroups(updatedMuscleGroups);
    };

    const handleSaveWorkout = () => {
        // Show error to user if no name is specified
        if (workoutName.length <= 0) {
            showErrorToast("Please enter a name!");
            return;
        }

        const muscleGroupNames = muscleGroups
            .filter(item => item.isChecked)
            .map(item => item.name);

        createWorkout(props.db, workoutName, "2023-04-02", JSON.stringify(muscleGroupNames))
            .catch(() => showErrorToast("Something went wrong while creating the new workout!"));
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
                <Checkbox key={index} isChecked={muscleGroup.isChecked} onChange={() => handleCheckChange(index)}
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
