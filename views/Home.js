import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Heading, Box, FlatList, Text} from 'native-base';
import {useNavigation} from "@react-navigation/native";

import WorkoutListElement from "../components/WorkoutListElement";
import BottomBar from "../components/BottomBar";
import {deleteRowByID} from "../SQL/CreateSQLDatabase";

const Home = (props) => {
    useNavigation();
    const handleDelete = (id) => {
        deleteRowByID(props.db, id);
        props.triggerUpdate();
    };

    return (
        <SafeAreaView flex={1} style={{backgroundColor: "white"}}>
            <Box style={styles.workoutContainer}>
                <Heading textAlign="center">Your workouts</Heading>
                {props.workouts.length > 0 ?
                    <FlatList
                        mt={5}
                        data={props.workouts}
                        renderItem={({item}) =>
                            <WorkoutListElement key={item.id} item={item}
                                                onDeleteItem={() => handleDelete(item.id)}/>}
                        keyExtractor={(item) => item.id}/>
                    :
                    <Box flex={1} display="flex" style={{justifyContent: "center"}}>
                        <Text fontSize="md" color="#454545" textAlign="center">Nothing here!</Text>
                    </Box>
                }
            </Box>
            <BottomBar/>
        </SafeAreaView>
    );
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
        paddingTop: 30,
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