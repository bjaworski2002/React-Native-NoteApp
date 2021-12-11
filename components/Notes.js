import * as React from 'react';
import {Text, View, Button} from "react-native";
import {useKeys, useKeyUpdate} from "../KeyContext";
import {useEffect, useState} from "react";

export default function Notes() {
    const keyTheme = useKeys()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{keyTheme.map(e => <Text>1234</Text>)}</Text>
        </View>
    );
}