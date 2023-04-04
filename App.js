import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewWorkout from './views/NewWorkout';
import Home from "./views/Home";
import * as SQLite from "expo-sqlite";
import {fetchWorkouts} from "./SQL/CreateSQLDatabase";
import WorkoutDetail from "./views/WorkoutDetail";

export default function HomeScreen() {
    const Stack = createNativeStackNavigator();
    const db = SQLite.openDatabase('workoutTracker.db');
    const [workoutRows, setWorkoutRows] = useState([]);

    // Fetch workouts
    const updateDatabase = () => {
        fetchWorkouts(db).then((rows) => {
            setWorkoutRows(rows._array);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(updateDatabase, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Workouts" options={{headerShown:false}}>{() =>
                    <Home db={db} workouts={workoutRows}/>}
                </Stack.Screen>

                <Stack.Screen name="NewWorkout" options={{title: 'New Workout'}}>
                    {() => <NewWorkout db={db} triggerUpdate={updateDatabase}/>}
                </Stack.Screen>

                <Stack.Screen name="WorkoutDetails" options={{title: 'Details'}}>
                    {() => <WorkoutDetail/>}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>

    );
}
