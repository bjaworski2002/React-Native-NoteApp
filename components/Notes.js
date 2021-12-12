import * as React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert} from "react-native";
import {useKeys, useKeyUpdate} from "../KeyContext";
import {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';

const getRandomBg = () => {
    const red = Math.floor(Math.random() * 256 / 2)
    const green = Math.floor(Math.random() * 256 / 2)
    const blue = Math.floor(Math.random() * 256 / 2)
    return "rgb(" + red + ", " + green + ", " + blue + ")"
}

const SingleNote = (props) => {
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)
    const [color, setColor] = useState("")
    const keyUpdateTheme = useKeyUpdate()
    const keyTheme = useKeys()
    const RemoveHandle = () => {
        Alert.alert("Czy chcesz usunąć tę notatkę?", values.header,[
            {
                text: "Yes",
                onPress: () => {
                    keyTheme.updateKey(props.id, "remove")
                }
            },
            {
                text: "No",
            },
        ])
    }
    useEffect(async () => {
        const key = await SecureStore.getItemAsync(props.id)
        await setValues(JSON.parse(key))
        setLoading(false)
        await setColor(getRandomBg())
    }, [keyTheme.keyList])
    return (
        <TouchableOpacity onLongPress={() => RemoveHandle()}>
            <View style={[styles.item, {backgroundColor: color}]}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>{new Date(parseInt(props.id)).getDate().toString()}</Text>
                    <Text style={styles.text}>.</Text>
                    <Text style={styles.text}>{new Date(parseInt(props.id)).getMonth().toString()}</Text>
                </View>
                <Text style={styles.text}>{values.header}</Text>
                <Text style={styles.text}>{values.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

function Notes() {
    const keyTheme = useKeys()
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                {keyTheme.keyList.map((e, index) => <SingleNote key={index} id={e}/>)}
            </View>
        </ScrollView>
    );
}

export default React.memo(Notes)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    item: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: 20,
        backgroundColor: "red",
        margin: Dimensions.get('window').width * 0.04,
        justifyContent: "space-around",
        alignItems: "center",
    },
    text: {
        fontSize: Dimensions.get('window').width * 0.05,
        color: '#fff'
    }
});