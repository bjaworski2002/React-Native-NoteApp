import {Button, Dimensions, Text, View} from "react-native";
import { TextInput } from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react'
import {KeyProvider, useKeys, useKeyUpdate} from "../KeyContext";

export default function Add() {
    const keyUpdateTheme = useKeyUpdate()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const sendText = () => {
        keyUpdateTheme(JSON.stringify({header: header, text: text}), "add")
        setHeader("")
        setText("")
        alert("Dodano notatkę!")
    }
    /*    useEffect(() => {
            console.log(JSON.stringify({header: header, text: text}))
        }, [header, text])*/
    return (
        <View style={{flex: 1}}>
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
            <Button title={"Button"} onPress={() => sendText()}/>
        </View>
    );
}