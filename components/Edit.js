import { Button, Dimensions, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react'
import { KeyProvider, useKeys, useKeyUpdate } from "../KeyContext";
import { Picker } from '@react-native-picker/picker';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
export default function Edit(props) {
    const keyTheme = useKeys()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [cat, setCat] = useState("")
    const [key, setKey] = useState(null)
    const sendText = () => {
        if (header !== "" && text !== "") {
            keyTheme.updateKey(JSON.stringify({ header: header, text: text, category: cat }), "edit", key)
            props.route.params.rerender()
            props.navigation.goBack()
        } else alert("Notatka musi wynosić co najmniej jeden znak")
    }
    /*    useEffect(() => {R
            console.log(JSON.stringify({header: header, text: text}))
        }, [header, text])*/
    useEffect(() => {
        console.log(`key: ${key}`)
    }, [key])
    useEffect(() => {
        setKey(props.route.params.key)
        setHeader(props.route.params.values.header)
        setText(props.route.params.values.text)
        setCat(props.route.params.values.category)
    }, [props.route.params.values])
    return (
        <View style={{ flex: 1 }}>
            <TextInput
                label={"Nagłówek"}
                type={'flat'}
                value={header}
                placeholder="Dodaj nagłowek!"
                onChangeText={(text) => setHeader(text)}
            />
            <TextInput type={'flat'}
                label={"Tekst"}
                placeholder="Dodaj tekst notatki!"
                multiline={true}
                value={text}
                onChangeText={(text) => setText(text)}
            />
            <Picker selectedValue={cat} onValueChange={(e) => setCat(e)}>
                {keyTheme.categoriesList.map((e, index) => <Picker.Item label={e} value={e} key={index} />)}
            </Picker>
            <Button title={"Button"} onPress={() => sendText()} />
        </View>
    );
}