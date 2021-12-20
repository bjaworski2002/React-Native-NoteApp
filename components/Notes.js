import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput } from 'react-native-paper';
import { useKeys, useKeyUpdate } from "../KeyContext";
import { useEffect, useState } from "react";
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
    const keyTheme = useKeys()
    const RemoveHandle = () => {
        Alert.alert("Czy chcesz usunąć tę notatkę?", values.header, [
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
    const rerender = async () => {
        const key = await SecureStore.getItemAsync(props.id)
        setValues(JSON.parse(key))
        console.log("rerender")
    }
    useEffect(() => {
        console.log(`term: ${props.term}`)
    }, [props.term])
    useEffect(async () => {
        const key = await SecureStore.getItemAsync(props.id)
        setValues(JSON.parse(key))
        setLoading(false)
        setColor(getRandomBg())
    }, [keyTheme.keyList])
    if (values.header && values.text && values.category) {
        return (values.header.includes(props.term) || values.text.includes(props.term) || values.category.includes(props.term) ? (
            <TouchableOpacity onPress={() => props.navigation.navigate("Edit", { key: props.id, values: values, rerender: () => rerender() })} onLongPress={() => RemoveHandle()}>
                <View style={[styles.item, { backgroundColor: color }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>{new Date(parseInt(props.id)).getDate().toString()}</Text>
                            <Text style={styles.text}>.</Text>
                            <Text style={styles.text}>{(new Date(parseInt(props.id)).getMonth() + 1).toString()}</Text>
                        </View>
                        <Text style={styles.text}>   {values.category}</Text>
                    </View>
                    <Text style={styles.text}>{values.header}</Text>
                    <Text style={styles.text}>{values.text}</Text>
                </View>
            </TouchableOpacity>) : null
        )
    } else return null
}

function Notes(props) {
    const keyTheme = useKeys()
    const [term, setTerm] = useState("")
    return (
        <ScrollView style={styles.container}>
            <TextInput
                label={"Szukaj notatki!"}
                type={'flat'}
                placeholder="Szukaj notatki!"
                onChangeText={(text) => setTerm(text)}
            />
            <View style={styles.innerContainer}>
                {keyTheme.keyList.map((e, index) => <SingleNote {...props} key={index} id={e} term={term} />)}
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