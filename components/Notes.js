import * as React from 'react';
import {Text, View, Button} from "react-native";
import {useKeys, useKeyUpdate} from "../KeyContext";
import {useEffect} from "react";

export default function Notes(props) {
    const keyTheme = useKeys()
    const keyUpdateTheme = useKeyUpdate()
    useEffect(() => {
        console.log(keyTheme)
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title={"Button"} onPress={() => keyUpdateTheme("1234")}/>
        </View>
    );
}