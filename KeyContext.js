import React, {useContext, useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const KeyContext = React.createContext()
const KeyUpdateContext = React.createContext()

// _ALL_KEYS = tablica zawierająca wszystkie klucze
// _ALL_CATEGORIES = tablica zawierająca wszystkie kategorie (TO DO)

export function useKeys(){
    return useContext(KeyContext)
}
export function useKeyUpdate(){
    return useContext(KeyUpdateContext)
}
export function KeyProvider({children}){
    const [keyList, setKeyList] = useState([])
    useEffect(async () => {
        const _keys = await SecureStore.getItemAsync("_ALL_KEYS")
        if(_keys){
            await setKeyList(JSON.parse(_keys))
        }
        else {
            await SecureStore.setItemAsync("_ALL_KEYS", JSON.stringify([]));
        }
    }, [])
    useEffect(async () => {
        const val = await SecureStore.getItemAsync("_ALL_KEYS");
        console.log(val)
    }, [keyList])
    async function updateKey(value){
        try {
            const d = new Date()
            await SecureStore.setItemAsync("_ALL_KEYS", JSON.stringify([...keyList, d.getTime().toString()]));
            await SecureStore.setItemAsync(d.getTime().toString(), value);
            await setKeyList(keyList.concat(d.getTime().toString()))
        } catch (e){
            console.log(e)
        }
    }
    return (
        <KeyContext.Provider value={keyList}>
            <KeyUpdateContext.Provider value={(value) => updateKey(value)}>
                {children}
            </KeyUpdateContext.Provider>
        </KeyContext.Provider>
    )
}