import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewWorkout from './views/NewWorkout';
import Home from "./views/Home";
import * as SQLite from "expo-sqlite";
import {deleteWorkoutsTable, fetchWorkouts} from "./SQL/CreateSQLDatabase";
import WorkoutDetail from "./views/WorkoutDetail";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {theme} from "./NativeBaseTheme";

export default function HomeScreen() {
    const Stack = createNativeStackNavigator();

    const db = SQLite.openDatabase('workoutTracker.db');
    const [workoutRows, setWorkoutRows] = useState([]);

    // Fetch workouts
    const updateDatabase = () => {
        fetchWorkouts(db).then((rows) => {
            setWorkoutRows(rows);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(updateDatabase, []);

    return (
        <ActionSheetProvider>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Workouts" options={{headerShown: false}}>{() => <Home db={db}
                                                                                                  workouts={workoutRows}
                                                                                                  triggerUpdate={updateDatabase}/>}
                        </Stack.Screen>
                        <Stack.Screen name="NewWorkout" options={{title: 'New Workout'}}>
                            {() => <NewWorkout db={db} triggerUpdate={updateDatabase}/>}
                        </Stack.Screen>
                        <Stack.Screen name="WorkoutDetails"
                                      options={({route}) => ({
                                          title: route.params.title, workout: route.params.workout
                                      })}
                                      component={WorkoutDetail}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </ActionSheetProvider>
    );
}
