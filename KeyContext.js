import React, {useContext, useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';

const KeyContext = React.createContext()
const KeyUpdateContext = React.createContext()

// _ALL_KEYS = tablica zawierająca wszystkie klucze
// _ALL_CATEGORIES = tablica zawierająca wszystkie kategorie (TO DO)

export function useKeys() {
    return useContext(KeyContext)
}

export function useKeyUpdate() {
    return useContext(KeyUpdateContext)
}

export function KeyProvider({children}) {
    const [keyList, setKeyList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(async () => {
        const _keys = await SecureStore.getItemAsync("_ALL_KEYS")
        if (_keys) {
            await setKeyList(JSON.parse(_keys))
        } else {
            await SecureStore.setItemAsync("_ALL_KEYS", JSON.stringify([]));
        }
        const _categories = await SecureStore.getItemAsync("_ALL_CATEGORIES")
        if (_categories) {
            await setCategoriesList(JSON.parse(_categories))
        } else {
            await SecureStore.setItemAsync("_ALL_CATEGORIES", JSON.stringify(["psy", "koty"]));
        }
    }, [])

    useEffect(async () => {
        const val = await SecureStore.getItemAsync("_ALL_KEYS");
        //console.log(val)
    }, [keyList])

    async function updateCategory(value){
        await SecureStore.setItemAsync("_ALL_CATEGORIES", JSON.stringify([...categoriesList, value]))
        await setCategoriesList(categoriesList.concat(value))
    }
    async function updateKey(value, type, key) {
        try {
            //console.log(type)
            switch (type) {
                case "add":
                    const d = new Date()
                    await SecureStore.setItemAsync("_ALL_KEYS", JSON.stringify([...keyList, d.getTime().toString()]));
                    await SecureStore.setItemAsync(d.getTime().toString(), value);
                    await setKeyList(keyList.concat(d.getTime().toString()))
                    break;
                case "remove":
                    //console.log(keyList)
                    //console.log(value)
                    await SecureStore.deleteItemAsync(value);
                    await setKeyList(keyList.filter(a => a != value))
                    await SecureStore.setItemAsync("_ALL_KEYS", JSON.stringify([...keyList.filter(a => a != value)]))
                    break;
                case "edit":
                    await SecureStore.setItemAsync(key, value);
                    break;
            }
        } catch (e) {
            console.log (e)
        }
    }

    return (
        <KeyContext.Provider value={{
            keyList: keyList,
            categoriesList: categoriesList,
            updateKey: (value, type, key) => updateKey(value, type, key),
            updateCategory: (value) => updateCategory(value)
        }}>
            {children}
        </KeyContext.Provider>
    )
}