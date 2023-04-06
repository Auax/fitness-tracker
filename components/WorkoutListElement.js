import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'native-base';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {useActionSheet} from "@expo/react-native-action-sheet";

const WorkoutListElement = (props) => {
    const navigation = useNavigation();
    const {showActionSheetWithOptions} = useActionSheet();

    const handleLongPress = () => {
        const options = ['Delete', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex
        }, (selectedIndex: number) => {
            switch (selectedIndex) {
                case destructiveButtonIndex:
                    props.onDeleteItem();
                    break;

                case cancelButtonIndex:
                // Canceled
            }
        });
    }

    return (
        <TouchableOpacity style={styles.workout}
                          key={props.key}
                          onPress={() => navigation.navigate("WorkoutDetails", {
                              title: props.item.name,
                              workout: props.item
                          })}
                          onLongPress={handleLongPress}>
            <Text fontWeight="semibold">{props.item.name}</Text>
            <Icon as={AntDesign} name="right" size={15}/>
        </TouchableOpacity>
    )
};

export default WorkoutListElement;

const styles = StyleSheet.create({
    workout: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#f1f1f1",
        padding: 17,
        marginVertical: 5,
        borderRadius: 6
    }
});