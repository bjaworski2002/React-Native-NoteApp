import {Button, Text, TextInput, View} from "react-native";
import React, {useContext, useEffect, useState} from 'react'
import {KeyProvider, useKeys, useKeyUpdate} from "../KeyContext";
export default function Add() {
    const keyUpdateTheme = useKeyUpdate()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")

/*    useEffect(() => {
        console.log(JSON.stringify({header: header, text: text}))
    }, [header, text])*/
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput style={{height: 80}}
                       placeholder="Dodaj nagłówek notatki!"
                       onChangeText={(text) => setHeader(text)}
            />
            <TextInput style={{height: 80}}
                       placeholder="Dodaj tekst notatki!"
                       multiline={true}
                       onChangeText={(text) => setText(text)}
            />
            <Button title={"Button"} onPress={() => keyUpdateTheme(JSON.stringify({header: header, text: text}))}/>
        </View>
    );
}