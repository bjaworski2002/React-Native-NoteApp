import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from 'react-native-paper';
import { useKeys } from "../KeyContext";
export default function Categories() {
    const keyTheme = useKeys()
    const [term, setTerm] = useState("")
    const setCat = (value) => {
        console.log(value)
        setTerm(value)
    }
    const sendCat = () => {
        keyTheme.updateCategory(term)
        alert("Dodano kategorię!")
    }
    return (
        <View>
            <TextInput
                label={"Kategoria"}
                type={'flat'}
                placeholder="Dodaj kategorię!"
                onChangeText={(value) => setCat(value)}
            />
            <Button title={"Dodaj!"} onPress={() => sendCat()} />
        </View>)
}