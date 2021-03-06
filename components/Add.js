import { Button, Dimensions, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react'
import { KeyProvider, useKeys, useKeyUpdate } from "../KeyContext";
import { Picker } from '@react-native-picker/picker';
export default function Add() {
    const keyTheme = useKeys()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [cat, setCat] = useState("")
    const sendText = () => {
        if (header !== "" && text !== "") {
            keyTheme.updateKey(JSON.stringify({ header: header, text: text, category: cat }), "add")
            alert("Dodano notatkę!")
        } else alert("Notatka musi wynosić co najmniej jeden znak")
    }
    /*    useEffect(() => {R
            console.log(JSON.stringify({header: header, text: text}))
        }, [header, text])*/
    useEffect(() => {
        setCat(keyTheme.categoriesList[0])
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <TextInput
                label={"Nagłówek"}
                type={'flat'}
                placeholder="Dodaj nagłowek!"
                onChangeText={(text) => setHeader(text)}
            />
            <TextInput type={'flat'}
                label={"Tekst"}
                placeholder="Dodaj tekst notatki!"
                multiline={true}
                onChangeText={(text) => setText(text)}
            />
            <Picker selectedValue={cat} onValueChange={(e) => setCat(e)}>
                {keyTheme.categoriesList.map((e, index) => <Picker.Item label={e} value={e} key={index} />)}
            </Picker>
            <Button title={"Button"} onPress={() => sendText()} />
        </View>
    );
}