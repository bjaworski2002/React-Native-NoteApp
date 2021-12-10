import {Text, View} from "react-native";
import React, {useContext, useEffect} from 'react'
import {KeyProvider} from "../KeyContext";
export default function Add(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add Screen</Text>
        </View>
    );
}